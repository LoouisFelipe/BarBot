// Importar scripts do Firebase
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAoH2EmhfSB3i9Vo6tgcAW0_HXXA06HKzw",
    authDomain: "barbot-business.firebaseapp.com",
    projectId: "barbot-business",
    storageBucket: "barbot-business.appspot.com",
    messagingSenderId: "520633048482",
    appId: "1:520633048482:web:d6dec22c360f84af6e66fb"
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const CACHE_NAME = 'barbot-business-cache-v1';
const urlsToCache = [
  '/',
  '/favicon.ico', // Exemplo de asset na pasta public
  '/images/logo.png' // Exemplo, adicione seus assets reais
];

// Evento de Instalação: Salva os assets principais em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        // Usamos addAll com um array de requisições para melhor controle de falhas
        const cachePromises = urlsToCache.map(urlToCache => {
            return cache.add(new Request(urlToCache, {cache: 'reload'}));
        });
        return Promise.all(cachePromises);
      })
      .catch(err => {
          console.error('Falha ao fazer cache dos arquivos na instalação:', err);
      })
  );
});

// Evento de Ativação: Limpa caches antigos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de Fetch: Intercepta as requisições de rede
self.addEventListener('fetch', event => {
  // Ignoramos requisições que não são GET
  if (event.request.method !== 'GET') {
      return;
  }
    
  // Estratégia: Network First, then Cache (para APIs e dados dinâmicos)
  // Para requisições de API, é melhor sempre buscar na rede primeiro.
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
    return;
  }

  // Estratégia: Cache First, then Network (para assets estáticos)
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Retorna do cache se encontrado
        if (cachedResponse) {
          return cachedResponse;
        }
        // Caso contrário, busca na rede
        return fetch(event.request).then(networkResponse => {
            // Opcional: Adiciona a nova resposta ao cache se desejar
            return caches.open(CACHE_NAME).then(cache => {
                // Verifique se a resposta é válida antes de fazer cache
                if (networkResponse && networkResponse.status === 200) {
                    cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            });
        });
      })
  );
});

// Manipulador de Mensagens em Background
messaging.onBackgroundMessage(function(payload) {
  console.log('Recebida mensagem em background: ', payload);

  // TODO: Adicionar verificação de autenticação do usuário aqui.
  // A lógica dependerá de como você gerencia as sessões.
  // Ex: verificar IndexedDB por um token de usuário antes de prosseguir.
  // if (!isUserAuthenticated()) { 
  //   console.log('Usuário não autenticado, notificação descartada.');
  //   return; 
  // }

  const notificationTitle = payload.notification.title || 'Nova Notificação';
  const notificationOptions = {
    body: payload.notification.body || 'Você tem uma nova mensagem.',
    icon: payload.notification.icon || '/favicon.ico', // Usando um ícone padrão do projeto
    data: {
      url: payload.data.url || '/' // URL para abrir ao clicar na notificação
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Manipulador de Clique na Notificação
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
