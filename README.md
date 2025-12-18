# 🚀 Guia de Desenvolvimento - LKNG Blocks

## ⚙️ Configuração do Ambiente

### 📦 Dependências
```bash
npm install
```

### 🔨 Comandos de Build

#### Desenvolvimento (com watch)
```bash
npm run dev
```

#### Produção
```bash
npm run build
```

#### Servidor de desenvolvimento
```bash
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── blocks/
│   └── youtube-shorts-gallery/
│       ├── editor.js      # Gutenberg editor
│       ├── frontend.js    # Frontend com Swiper.js
│       ├── editor.css     # Estilos do editor
│       └── frontend.css   # Estilos do frontend
```

## 🎯 YouTube Shorts Gallery Block

### ✨ Recursos Implementados
- **🎠 Carousel Infinito**: Powered by Swiper.js
- **📱 Responsivo**: Adapta automaticamente para mobile/tablet/desktop
- **🎮 Controles**: Setas de navegação + pagination dots
- **♿ Acessibilidade**: Suporte a keyboard e screen readers
- **🎨 Efeitos**: Coverflow effect com cards centralizados
- **⚡ Performance**: Lazy loading de imagens

### 🛠️ Modo Slider vs Gallery
- **Slider Mode**: Carousel infinito com Swiper.js (padrão)
- **Gallery Mode**: Grid tradicional com navegação simples

### 🎛️ Controles do Editor
- Toggle Slider/Gallery mode
- Configuração de colunas (gallery mode)
- Show/hide navigation arrows
- Gerenciar vídeos via sidebar

## 🔧 Desenvolvimento

### 📝 Editando os Blocos
1. Edite arquivos em `src/blocks/`
2. Execute `npm run dev` para watch automático
3. Arquivos compilados vão para `blocks/`

### 🧪 Testing
- Teste no Gutenberg editor
- Verifique responsividade
- Teste navegação por teclado
- Validar URLs do YouTube

### 📱 Breakpoints Responsivos
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: até 767px

## 🎨 Customização de Estilos

### 🎪 Variáveis CSS
```css
--primary-color: #ff0000;    /* Cor principal (YouTube red) */
--secondary-color: #333;     /* Cor secundária */
--border-radius: 16px;       /* Border radius dos cards */
```

### 🎭 Efeitos Swiper
```javascript
coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: false,
}
```

## 📚 Bibliotecas Utilizadas
- **Swiper.js v11**: Carousel infinito
- **Webpack 5**: Bundler
- **Babel**: Transpilação ES6+
- **CSS Loader**: Processamento CSS

## 🐛 Troubleshooting

### Swiper não inicializa
- Verificar se jQuery está carregado
- Conferir console para erros
- Validar estrutura HTML do PHP

### Styles não aplicam
- Executar `npm run build`
- Limpar cache do WordPress
- Verificar ordem de carregamento CSS

### Performance
- Otimizar imagens thumbnail
- Usar lazy loading
- Minimizar JavaScript

## 🚀 Deploy

### Produção
1. `npm run build`
2. Commit arquivos compilados
3. Upload para WordPress

### Staging
1. `npm run dev` para desenvolvimento
2. Test em ambiente local
3. Validar cross-browser