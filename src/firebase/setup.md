# Firebase Kurulum Rehberi

## 1. Firebase Projesi Oluşturun

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Add project" butonuna tıklayın
3. Proje adını girin (örn: "blog-app-auth")
4. Google Analytics'i etkinleştirin (opsiyonel)
5. "Create project" butonuna tıklayın

## 2. Authentication'ı Etkinleştirin

1. Sol menüden "Authentication" seçin
2. "Get started" butonuna tıklayın
3. "Sign-in method" sekmesine gidin
4. "Email/Password" seçeneğini etkinleştirin
5. "Save" butonuna tıklayın

## 3. Web App Konfigürasyonu

1. Sol menüden "Project settings" (⚙️) seçin
2. "Your apps" bölümünde web ikonuna (</>) tıklayın
3. App nickname girin (örn: "blog-app")
4. "Register app" butonuna tıklayın
5. Konfigürasyon bilgilerini kopyalayın

## 4. Konfigürasyonu Güncelleyin

`src/firebase/config.js` dosyasındaki `firebaseConfig` objesini gerçek bilgilerinizle güncelleyin:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id",
};
```

## 5. Güvenlik Kuralları

Firebase Console > Authentication > Settings > Authorized domains bölümünden:

-   `localhost` (geliştirme için)
-   `your-domain.com` (production için)

ekleyin.

## Test Kullanıcıları

Geliştirme aşamasında test kullanıcıları oluşturabilirsiniz:

1. Firebase Console > Authentication > Users
2. "Add user" butonuna tıklayın
3. Email ve password girin

## Önemli Notlar

-   API key'i güvenli tutun
-   Production'da environment variables kullanın
-   Firebase Security Rules'ları düzenleyin
