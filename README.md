# Link Nacional Blocks for Gutenberg

[![WordPress](https://img.shields.io/badge/WordPress-5.0%2B-blue.svg)](https://wordpress.org)
[![PHP](https://img.shields.io/badge/PHP-7.4%2B-purple.svg)](https://php.net)
[![License](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](http://www.gnu.org/licenses/gpl-2.0.html)
[![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg)](#)

Plugin WordPress profissional que adiciona **blocos customizados de alta qualidade** para o editor Gutenberg, especializando-se em galerias interativas de mídia social.

## ✨ Recursos Principais

### 🎬 **YouTube Shorts Gallery**
Galeria avançada de YouTube Shorts com funcionalidades profissionais:

- **🎠 Modo Carousel**: Slider infinito com navegação fluida usando Swiper.js
- **📱 Modo Grid**: Layout responsivo em grade customizável  
- **🎮 Controles Inteligentes**: Setas de navegação, paginação e autoplay
- **⚡ Performance Otimizada**: Lazy loading nativo e carregamento assíncrono
- **♿ Acessibilidade Total**: Suporte completo a teclado e screen readers
- **📐 Totalmente Responsivo**: Adapta perfeitamente para todos os dispositivos

**Configurações Avançadas:**
- Número de colunas personalizável (modo grid)
- Controles de navegação toggle on/off  
- Gerenciamento intuitivo de vídeos via sidebar
- Configurações de autoplay e velocidade

### 📸 **Instagram Reels Gallery**
Galeria otimizada de Instagram Reels com reprodução inline:

- **🔄 Reprodução Inline**: Sem redirecionamentos para o Instagram
- **🎯 Embedding Otimizado**: Carregamento rápido e confiável
- **📱 Layout Responsivo**: Perfeito em todos os tamanhos de tela
- **🎠 Navegação de Carrossel**: Entre posts com múltiplas imagens/vídeos
- **🎨 CSS Customizado**: Integração visual perfeita com seu tema
- **🚫 Anti-Redirect**: Sistema que previne redirecionamentos indesejados

## 📁 Estrutura do Projeto

```
lkng-blocks/
├── admin/                          # Interface administrativa
│   ├── Lkng_Blocks_Admin.php      # Classe admin principal
│   ├── css/                        # Estilos do admin
│   └── js/                         # Scripts administrativos
├── blocks/                         # Blocos Gutenberg
│   ├── youtube-shorts-gallery/     # Bloco YouTube Shorts
│   │   ├── block.php              # Definição e registro
│   │   ├── editor.js              # Interface Gutenberg
│   │   ├── frontend.js            # Funcionalidades frontend
│   │   └── style.css              # Estilos do bloco
│   └── instagram-reels-gallery/    # Bloco Instagram Reels
│       ├── block.php              # Definição e registro  
│       ├── editor.js              # Interface Gutenberg
│       ├── frontend.js            # Funcionalidades frontend
│       └── style.css              # Estilos do bloco
├── includes/                       # Classes principais
│   ├── Lkng_Blocks.php            # Classe principal
│   ├── Lkng_Blocks_Loader.php     # Carregador de hooks
│   ├── Lkng_Blocks_i18n.php       # Internacionalização
│   ├── Lkng_Blocks_Activator.php  # Ativação do plugin
│   └── Lkng_Blocks_Deactivator.php# Desativação do plugin
├── public/                         # Frontend público
│   ├── Lkng_Blocks_Public.php     # Classe pública
│   ├── css/                        # Estilos públicos
│   └── js/                         # Scripts públicos
├── languages/                      # Traduções
│   └── lkng-blocks.pot            # Template de tradução
├── lkng-blocks.php                # Arquivo principal
├── uninstall.php                  # Limpeza na desinstalação
└── README.md                      # Documentação
```

## 🚀 Instalação e Configuração

### Requisitos do Sistema
- **WordPress**: 5.0 ou superior
- **PHP**: 7.4 ou superior  
- **MySQL**: 5.6 ou superior
- **Navegadores**: Chrome, Firefox, Safari, Edge (versões modernas)

### Instalação Rápida
```bash
# Via WordPress Admin
1. Plugins > Adicionar Novo
2. Buscar "Link Nacional Blocks for Gutenberg"
3. Instalar e Ativar

# Instalação Manual
1. Download do plugin
2. Upload para /wp-content/plugins/
3. Ativar via Plugins > Plugins Instalados
```

### Uso Básico
1. **Criar/Editar** post ou página
2. **Adicionar Bloco** (+) no Gutenberg
3. **Localizar** "YouTube Shorts Gallery" ou "Instagram Reels Gallery"
4. **Configurar** conforme necessário
5. **Publicar** e visualizar

## 🛠️ Para Desenvolvedores

### Setup de Desenvolvimento
```bash
# Clone do repositório
git clone https://github.com/linknacional/lkng-blocks.git
cd lkng-blocks

# Instalar dependências (se houver)
composer install  # Para dependências PHP
npm install        # Para dependências Node.js

# Compilar assets (se aplicável)
npm run build
```

### Estrutura de Desenvolvimento
- **PHP Classes**: Seguem padrões WordPress e PSR-4
- **JavaScript**: ES6+ com Babel transpilation
- **CSS**: PostCSS com autoprefixer
- **Hooks**: Sistema completo de actions e filters
- **Security**: Nonces, sanitização e validação completa

## 🎨 Personalização

### CSS Customizações
```css
/* Personalizar YouTube Shorts Gallery */
.lkng-youtube-shorts-gallery {
    /* Seus estilos */
}

/* Personalizar Instagram Reels Gallery */
.lkng-instagram-reels-gallery {
    /* Seus estilos */
}
```

### Hooks Disponíveis
```php
// Actions
do_action('lkng_blocks_before_youtube_gallery', $attributes);
do_action('lkng_blocks_after_instagram_gallery', $attributes);

// Filters
apply_filters('lkng_blocks_youtube_gallery_classes', $classes, $attributes);
apply_filters('lkng_blocks_instagram_embed_url', $url, $post_id);
```

## 🔧 Tecnologias Utilizadas

- **WordPress REST API**: Integração nativa
- **React**: Interface Gutenberg moderna  
- **Swiper.js**: Carousels de alta performance
- **CSS Grid & Flexbox**: Layouts responsivos avançados
- **JavaScript ES6+**: Código moderno e otimizado
- **Lazy Loading**: Performance nativa do navegador
- **Intersection Observer**: Detecção de viewport eficiente

## 📞 Suporte e Contato

- **🌐 Website**: [Link Nacional](https://www.linknacional.com/)
- **📧 Suporte**: Entre em contato através do nosso site
- **📚 Documentação**: Guias detalhados disponíveis
- **🐛 Issues**: Reporte problemas via GitHub ou site oficial

## 📄 Licença

Este plugin é licenciado sob a **GPL v2 ou posterior**.

```
Copyright (C) 2024 Link Nacional

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.
```

## 🚀 Roadmap

### Versões Futuras
- [ ] **Block Patterns**: Templates pré-configurados
- [ ] **TikTok Gallery**: Suporte a vídeos TikTok  
- [ ] **Advanced Customization**: Mais opções de personalização
- [ ] **Performance Analytics**: Métricas de carregamento
- [ ] **Multi-language Support**: Traduções completas

---

**Desenvolvido com ❤️ pela equipe [Link Nacional](https://www.linknacional.com/)**
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