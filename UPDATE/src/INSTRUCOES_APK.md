# 📱 Guia Completo: Converter para APK Android

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

1. **Node.js** (versão 18 ou superior)
   - Download: https://nodejs.org/

2. **Java Development Kit (JDK)** (versão 17)
   - Download: https://www.oracle.com/java/technologies/downloads/

3. **Android Studio**
   - Download: https://developer.android.com/studio
   - Durante a instalação, certifique-se de incluir:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device

4. **Gradle** (será instalado automaticamente pelo Android Studio)

---

## 🚀 Passo a Passo

### **Etapa 1: Configurar Variáveis de Ambiente**

#### Windows:
1. Abra as configurações de variáveis de ambiente
2. Adicione estas variáveis:
   ```
   ANDROID_HOME = C:\Users\SeuUsuario\AppData\Local\Android\Sdk
   JAVA_HOME = C:\Program Files\Java\jdk-17
   ```
3. Adicione ao PATH:
   ```
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\tools
   %JAVA_HOME%\bin
   ```

#### macOS/Linux:
Adicione ao arquivo `~/.bashrc` ou `~/.zshrc`:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
```

Execute: `source ~/.bashrc` (ou `source ~/.zshrc`)

---

### **Etapa 2: Instalar Dependências**

No diretório do projeto, execute:

```bash
npm install
```

---

### **Etapa 3: Inicializar Capacitor para Android**

```bash
npm run android:init
```

Isso criará a pasta `android/` com todo o projeto Android nativo.

---

### **Etapa 4: Build do Projeto Web**

```bash
npm run build
```

Isso cria a pasta `dist/` com os arquivos otimizados.

---

### **Etapa 5: Sincronizar com Android**

```bash
npm run android:sync
```

Isso copia os arquivos web para o projeto Android.

---

### **Etapa 6: Abrir no Android Studio**

```bash
npm run android:open
```

O Android Studio abrirá automaticamente.

---

### **Etapa 7: Gerar APK Debug (para testes)**

No Android Studio:

1. Clique em **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Aguarde a compilação
3. Clique em "locate" na notificação
4. O APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

**Instalar no celular:**
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

### **Etapa 8: Gerar APK Release (para publicação)**

#### 8.1 Criar Keystore (apenas uma vez)

```bash
keytool -genkey -v -keystore release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

**Importante:** Guarde bem a senha! Você precisará dela.

#### 8.2 Configurar Keystore no Android

Crie o arquivo `android/key.properties`:

```properties
storePassword=SUA_SENHA_AQUI
keyPassword=SUA_SENHA_AQUI
keyAlias=my-key-alias
storeFile=../../release-key.keystore
```

#### 8.3 Editar `android/app/build.gradle`

Adicione antes de `android {`:

```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Dentro de `android { ... }`, adicione:

```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

#### 8.4 Gerar APK Release

No Android Studio:

1. **Build** → **Select Build Variant** → Escolha **release**
2. **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. APK estará em: `android/app/build/outputs/apk/release/app-release.apk`

---

## 🎨 Personalização Adicional

### Ícone do App

1. Crie um ícone 1024x1024px
2. Use: https://icon.kitchen/
3. Faça download e substitua em `android/app/src/main/res/`

### Splash Screen

Edite `android/app/src/main/res/values/styles.xml`:

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/splash</item>
</style>
```

Adicione sua imagem splash em `android/app/src/main/res/drawable/splash.png`

### Nome do App

Edite `android/app/src/main/res/values/strings.xml`:

```xml
<string name="app_name">Mood & Med Tracker</string>
```

---

## 🔧 Comandos Úteis

```bash
# Build e sincronizar em um comando
npm run android:sync

# Rodar no emulador/dispositivo conectado
npm run android:run

# Apenas abrir Android Studio
npm run android:open

# Limpar build anterior
cd android && ./gradlew clean
```

---

## 📱 Testar no Dispositivo Físico

1. Ative **Opções de Desenvolvedor** no Android:
   - Configurações → Sobre o telefone
   - Toque 7x em "Número da versão"

2. Ative **Depuração USB**:
   - Configurações → Opções do desenvolvedor → Depuração USB

3. Conecte via USB e verifique:
   ```bash
   adb devices
   ```

4. Instale:
   ```bash
   npm run android:run
   ```

---

## 🐛 Problemas Comuns

### "ANDROID_HOME not set"
- Configure as variáveis de ambiente corretamente
- Reinicie o terminal

### "SDK location not found"
Crie `android/local.properties`:
```
sdk.dir=/Users/SeuUsuario/Library/Android/sdk
```

### "Gradle build failed"
```bash
cd android
./gradlew clean
cd ..
npm run android:sync
```

### APK não instala
- Verifique se o dispositivo permite "Instalar apps desconhecidos"
- Use: `adb install -r caminho/do/app.apk` (o `-r` substitui)

---

## 📦 Publicar na Google Play Store

1. Crie uma conta de desenvolvedor: https://play.google.com/console
2. Gere o APK Release (Etapa 8)
3. Ou gere um **App Bundle** (recomendado):
   ```bash
   cd android
   ./gradlew bundleRelease
   ```
4. O arquivo estará em: `android/app/build/outputs/bundle/release/app-release.aab`
5. Faça upload na Play Console

---

## ✅ Checklist Final

- [ ] Todas as dependências instaladas
- [ ] Variáveis de ambiente configuradas
- [ ] `npm run build` executado com sucesso
- [ ] `npm run android:sync` executado
- [ ] Android Studio abre sem erros
- [ ] APK gerado com sucesso
- [ ] App testado no dispositivo
- [ ] Ícone e splash screen personalizados
- [ ] Keystore criada e guardada em local seguro

---

## 📞 Suporte

Se tiver problemas, verifique:
- Versões corretas do Node, Java e Android SDK
- Logs de erro no terminal
- Documentação oficial: https://capacitorjs.com/docs/android

Boa sorte com seu app! 🚀
