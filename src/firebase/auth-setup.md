# Firebase Authentication Kurulumu

## 1. Firebase Console'da Authentication'ı Etkinleştirin

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. `blog-app-f63f6` projenizi seçin
3. Sol menüden **"Authentication"** seçin
4. **"Get started"** butonuna tıklayın
5. **"Sign-in method"** sekmesine gidin
6. **"Email/Password"** seçeneğini bulun ve etkinleştirin
7. **"Save"** butonuna tıklayın

## 2. Test Kullanıcısı Oluşturun (Opsiyonel)

1. Authentication > Users sekmesine gidin
2. **"Add user"** butonuna tıklayın
3. Email: `test@example.com`
4. Password: `test123`
5. **"Add user"** butonuna tıklayın

## 3. Authorized Domains Ayarlayın

1. Authentication > Settings sekmesine gidin
2. **"Authorized domains"** bölümünde:
    - `localhost` (zaten var olmalı)
    - `blog-app-f63f6.firebaseapp.com` (zaten var olmalı)

## 4. Güvenlik Kuralları (Opsiyonel)

Firestore için güvenlik kuralları ayarlayabilirsiniz:

1. Firestore Database > Rules sekmesine gidin
2. Geçici olarak test kuralları:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Geçici - production'da değiştirin
    }
  }
}
```

## 5. Test Etmek İçin

Uygulamayı çalıştırın ve şu bilgilerle test edin:

**Demo Kullanıcısı (Artık çalışmayacak):**

-   Email: `demo@example.com`
-   Password: `demo123`

**Yeni Test Kullanıcısı:**

-   Email: `test@example.com` (Firebase Console'da oluşturduğunuz)
-   Password: `test123`

**Yeni Kullanıcı Kaydı:**

-   Herhangi bir email/password ile kayıt olabilirsiniz
