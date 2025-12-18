# LKNG Blocks

Plugin WordPress que adiciona blocos customizados para o Gutenberg editor.

## 📁 Estrutura do Projeto

```
lkng-blocks/
├── admin/                 # Interface administrativa
├── blocks/                # Blocos compilados
│   └── youtube-shorts-gallery/
│       ├── block.php      # Definição do bloco
│       ├── editor.js      # Editor Gutenberg
│       ├── frontend.js    # JavaScript frontend
│       └── style.css      # Estilos
├── includes/             # Classes principais
├── public/              # Frontend público
└── languages/          # Traduções
```

## 🎯 Blocos Disponíveis

### YouTube Shorts Gallery

Bloco para exibir galerias de YouTube Shorts com dois modos de visualização:

**✨ Recursos:**
- 🎠 **Modo Carousel**: Slider infinito com Swiper.js
- 📱 **Modo Grid**: Layout de galeria responsivo
- 🎮 **Controles**: Setas de navegação e pagination
- 📱 **Responsivo**: Adapta para mobile/tablet/desktop
- ⚡ **Performance**: Lazy loading de imagens
- ♿ **Acessibilidade**: Suporte a keyboard e screen readers

**🎛️ Opções do Editor:**
- Toggle entre modo Slider/Grid
- Configuração de colunas (modo grid)
- Show/hide controles de navegação
- Gerenciamento de vídeos via sidebar

## 🛠️ Desenvolvimento

### Requisitos
- WordPress 5.0+
- PHP 7.4+
- Node.js (para compilar assets)

### Setup Local
```bash
# Instalar dependências
npm install

# Compilar para desenvolvimento (com watch)
npm run dev

# Compilar para produção
npm run build
```

### Editando Blocos
1. Arquivos fonte ficam em `src/blocks/`
2. Execute `npm run dev` para watch automático
3. Arquivos compilados são gerados em `blocks/`

## 🎨 Customização

### Responsividade
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px  
- **Mobile**: até 767px

### Variáveis CSS Disponíveis
```css
--primary-color: #ff0000;    /* Cor principal (YouTube red) */
--secondary-color: #333;     /* Cor secundária */
--border-radius: 16px;       /* Border radius dos cards */
```

## 📚 Tecnologias

- **WordPress**: 5.0+
- **Gutenberg Blocks API**
- **Swiper.js v11**: Carousel
- **Webpack 5**: Build system
- **Babel**: Transpilação JavaScript

## 🐛 Solução de Problemas

### Swiper não funciona
- Verificar se o JavaScript foi carregado corretamente
- Conferir console do browser para erros
- Validar estrutura HTML gerada pelo PHP

### Estilos não aplicam
- Executar `npm run build` para recompilar
- Limpar cache do WordPress
- Verificar ordem de carregamento dos CSS

## 📝 Licença

GPL v2 ou posterior - veja [LICENSE.txt](LICENSE.txt) para detalhes.