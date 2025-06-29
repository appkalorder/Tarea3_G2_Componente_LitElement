import { LitElement, html, css } from 'lit';
import './product-detail-popup.js';

class ProductCard extends LitElement {
  static properties = {
    image: { type: String },
    title: { type: String },
    categories: { type: String },
    tags: { type: String },
    rating: { type: Number },
    extras: { type: String },
    price: { type: String },
    specifications: { type: String },
    parsedCategories: { state: true },
    parsedTags: { state: true },
    isFav: { state: true },
    cartAnimated: { state: true }
  };

  constructor() {
    super();
    this.image = '';
    this.title = '';
    this.categories = 'Todo';
    this.tags = '';
    this.rating = 0;
    this.extras = '';
    this.price = '';
    this.specifications = '';
    this.parsedCategories = ['Todo'];
    this.parsedTags = [];
    this.isFav = false;
    this.cartAnimated = false;
  }

  toggleFav() {
    this.isFav = !this.isFav;
  }

  animateCart() {
    this.cartAnimated = true;
    setTimeout(() => this.cartAnimated = false, 600);
  }

  firstUpdated() {
    this.parsedCategories = this.categories.split(',').map(c => c.trim());
    this.parsedTags = this.tags.split(',').map(t => t.trim());
  }

  static styles = css`
    :host {
      --color-bg: #fff;
      --color-text: #222;
      --color-primary: #003C71;
      --color-border: #ddd;
      --color-fav: #e53935;
      --color-icon: #000000; /* Nueva variable para iconos */
      --color-card-shadow: 0 4px 16px rgba(0,0,0,0.12);
      background: var(--color-bg);
      color: var(--color-text);
      transition: background 0.3s, color 0.3s;
    }
    :host([theme="dark"]) {
      --color-bg: #181a1b;
      --color-text:#a8a8a8;
      --color-primary:#2f9cce;
      --color-border: #444;
      --color-fav: #ff5252;
      --color-icon: #f1f1f1; /* Color de iconos en modo oscuro */
      --color-card-shadow: 0 4px 16px rgba(0,0,0,0.18);
    }
    :host([size="small"]) .card {
      font-size: 0.85em;
      padding: 0.5em;
    }
    .card {
      border-radius: 10px;
      padding: 1rem;
      display: flex;
      background: var(--color-bg);
      color: var(--color-text);
      max-width: 100%;
      font-family: Arial, sans-serif;
      box-shadow: var(--color-card-shadow);
    }
    .img-container {
      position: relative;
      border: 1px solid #ddd;
      border-radius: 10px;
      height: 100%;
      display: flex;
      align-self: center;
    }
    .fav-icon {
      position: absolute;
      right: 0.3rem;
      top: 0.3rem;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .fav-icon.fav {
      color: var(--color-fav);
      animation: fav-pop 0.3s;
    }
    @keyframes fav-pop {
      0% { transform: scale(1);}
      50% { transform: scale(1.3);}
      100% { transform: scale(1);}
    }
    img {
      width: 150px;
      height: 150px;
      border-radius: 10px;
      object-fit: cover;
      self-align: center;
    }
    .content {
      flex-grow: 1;
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
    }
    .description {
      display: flex;
      flex-direction: column;
      width: 90%;
    }
    .categories {
      font-size: 0.75rem;
      color: var(--color-text);
    }
    .categories-label {
      color: var(--color-primary);
    }
    h3 {
      margin: 0;
      color: #006935;
    }
    .stars {
      color: gold;
      margin: 0;
      font-size: 10px;
    }
    .tags p {
      font-size: 10px;
      color: var(--color-text);
      display: flex;
      align-items: center;
      margin: 0;
    }
    .tag-icon {
      margin-right: 0.2em;
    }
    .extras p {
      color: var(--color-primary);
      display: flex;
      align-items: center;
      gap: 0.2rem;
      font-size: 10px;
      margin: 0;
    }
    .extras-icon {
      margin-right: 0.2em;
    }
    button {
      position: relative;
      align-self: flex-end;
      padding: 2px;
      background: var(--color-bg);
      color: var(--color-primary);
      border: 1px solid var(--color-border);
      border-radius: 20px;
      margin-top: 0.2rem;
      cursor: pointer;
      width: 30%;
    }
    .actions {
      position: relative;
      flex: 1;
      min-height: 100px;
    }
    .icon-top-right {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
    .icon-top-right.cart-animate {
      animation: cart-bounce 0.6s;
      color: #006935;
    }
    @keyframes cart-bounce {
      0% { transform: scale(1);}
      30% { transform: scale(1.2) rotate(-10deg);}
      60% { transform: scale(0.9) rotate(10deg);}
      100% { transform: scale(1);}
    }
    .btn-bottom-right {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 120px;
      border: 1px #006935 solid;
    }
    .tag-icon svg,
    .extras-icon svg,
    .icon-top-right svg {
      fill: var(--color-icon);
    }
    .fav-icon svg {
      fill: #000; /* Mantiene color fijo */
    }
    .fav-icon.fav svg {
      fill: var(--color-fav);
    }
  `;

  renderStars() {
    const full = Math.floor(this.rating);
    const half = this.rating % 1 >= 0.3 ? 1 : 0;
    const empty = 5 - full - half;
    return html`${'★'.repeat(full)}${half ? '⯪' : ''}${'☆'.repeat(empty)}`;
  }

  _onFavChanged(e) {
    this.isFav = e.detail.isFav;
  }

  showPopup() {
    const popup = this.shadowRoot.querySelector('product-detail-popup');
    
    // Pasar el atributo theme al popup
    if (this.hasAttribute('theme')) {
      popup.setAttribute('theme', this.getAttribute('theme'));
    }
    
    popup.show({
      title: this.title,
      image: this.image,
      extras: this.extras,
      tags: this.parsedTags,
      categories: this.parsedCategories,
      specifications: this.specifications,
      rating: this.rating,
      price: this.price,
      isFav: this.isFav
    });
  }

  render() {
    return html`
      <div class="card">
        <div class="img-container">
          <i class="fav-icon ${this.isFav ? 'fav' : ''}" @click="${this.toggleFav}" 
            aria-label="Marcar como favorito"
            role="button"
            tabindex="0">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="${this.isFav ? '#e53935' : '#000'}">
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
            </svg>
          </i>
          <img src="${this.image}" alt="product" />
        </div>
        <div class="content">
          <div class="description">
            <div class="categories">
              <span class="categories-label">Categorías:</span> ${this.parsedCategories.join(', ')}
            </div>
            <h3>${this.title}</h3>
            <div class="stars">${this.renderStars()}</div>
            <div class="tags">
              ${this.parsedTags.slice(0, 3).map(tag => html`
                <p>
                  <i class="tag-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 24 24" width="12">
                      <path d="M0 0h24v24H0V0z" fill="none"/>
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </i>
                  <span>${tag}</span>
                </p>
              `)}
            </div>
            <div class="extras">
              <p>
                <i class="extras-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="#000">
                    <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
                  </svg>
                </i>
                ${this.extras}
              </p>
            </div>
          </div>
        </div>
        <div class="actions">
          <i class="icon-top-right ${this.cartAnimated ? 'cart-animate' : ''}" @click="${this.animateCart}"
            aria-label="Agregar al carrito"
            role="button"
            tabindex="0">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
            </svg>
          </i>
          <button class="btn-bottom-right" @click="${this.showPopup}"
            aria-label="Ver producto">
            Ver producto
          </button>
        </div>
        <product-detail-popup @fav-changed="${this._onFavChanged}"></product-detail-popup>
      </div>
    `;
  }
}

customElements.define('product-card', ProductCard);