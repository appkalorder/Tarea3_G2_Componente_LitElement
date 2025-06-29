import { LitElement, html, css } from 'lit';

class ProductDetailPopup extends LitElement {
  static properties = {
    product: { state: true },
    quantity: { state: true },
    isFav: { state: true }
  };

  constructor() {
    super();
    this.product = null;
    this.quantity = 1;
    this.isFav = false;
  }

  show(product) {
    this.product = product;
    this.isFav = !!product.isFav;
    this.updateComplete.then(() => {
      const dialog = this.shadowRoot.querySelector('dialog');
      if (dialog) dialog.showModal();
    });
  }

  toggleFav() {
    this.isFav = !this.isFav;
    if (this.product) this.product.isFav = this.isFav;
    this.dispatchEvent(new CustomEvent('fav-changed', {
      detail: { isFav: this.isFav, product: this.product },
      bubbles: true,
      composed: true
    }));
  }

  close() {
    this.shadowRoot.querySelector('dialog').close();
  }

  decrementQuantity() {
    if (this.quantity > 1) this.quantity = Number(this.quantity) - 1;
  }
  
  incrementQuantity() {
    this.quantity = Number(this.quantity) + 1;
  }

  static styles = css`
    :host {
      --color-bg: #fff;
      --color-neg-bg: #D9D9D9;
      --color-text: #222;
      --color-primary: #003C71;
      --color-border: #ddd;
      --color-fav: #e53935;
      --color-icon: #000000;
      --color-card-shadow: 0 4px 16px rgba(0,0,0,0.12);
      --color-title: #006935;
      --color-price: green;
      --color-specs-label: #FFD700;
    }
    
    :host([theme="dark"]) {
      --color-bg: #181a1b;
      --color-neg-bg: #3d3d3d;
      --color-text: #a8a8a8;
      --color-primary: #2f9cce;
      --color-border: #444;
      --color-fav: #ff5252;
      --color-icon: #f1f1f1;
      --color-card-shadow: 0 4px 16px rgba(0,0,0,0.18);
      --color-title: #4caf50;
      --color-price: #81c784;
      --color-specs-label: #ffd54f;
    }

    dialog {
      border: none;
      border-radius: 10px;
      width: 80%;
      max-width: 750px;
      padding: 1rem;
      box-shadow: var(--color-card-shadow);
      background: var(--color-bg);
      color: var(--color-text);
    }
    
    .card {
      display: flex;
      background: var(--color-bg);
      border-radius: 10px;
      gap: 1rem;
    }
    
    .img-container {
      position: relative;
      border: 1px solid var(--color-border);
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
      animation: fav-pop 0.3s;
    }
    
    @keyframes fav-pop {
      0% { transform: scale(1);}
      50% { transform: scale(1.3);}
      100% { transform: scale(1);}
    }
    
    img {
      width: 200px;
      height: 200px;
      border-radius: 10px;
      object-fit: cover;
      self-align: center;
    }
    
    .content {
      flex: 1;
    }
    
    .description {
      display: flex;
      flex-direction: column;
      width: 90%;
      gap: 0.2rem;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .categories {
      font-size: 0.75rem;
      color: var(--color-text);
    }
    
    .stars {
      color: gold;
      font-size: 1.1rem;
    }
    
    .tags {
      font-size: 0.9rem;
      margin-top: 0.2rem;
    }
    
    .extras p {
      color: var(--color-primary);
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }
    
    .extras, .specs {
      font-size: 0.85rem;
      margin-top: 0.2rem;
    }
    
    .stars-price {
      position: relative;
      display: flex;
      align-items: center;
      gap: 50px;
    }
    
    .price {
      position: absolute;
      right: 55%;
      top: -10px;
      font-size: 1.5rem;
      color: var(--color-price);
      font-weight: bold;
      margin-top: 0.5rem;
    }
    
    .tags-espects {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 3rem;
    }
    
    .content-r {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 0.5rem;
    }
    
    .up {
      display: flex;
      justify-content: space-between;
    }
    
    .down {
      display: flex;
      width: 100%;
      justify-content: space-around;
    }
    
    .count {
      display: flex;
    }
    
    .count div {
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.2rem;
    }
    
    .count .quantity {
      background: var(--color-neg-bg);
    }
    
    .actions {
      display: flex;
      width: 100%;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
      flex-wrap: wrap;
    }
    
    .btn-close {
      cursor: pointer;
    }
    
    .btn-add-cart, .btn-buy-now {
      display: flex;
      align-items: center;
    }

    .btn-buy-now {
      border: 1px solid var(--color-primary);
      border-radius: 20px;
      padding: 0.1rem 2rem;
      cursor: pointer;
      background: var(--color-bg);
      color: var(--color-primary);
    }
    
    .btn-add-cart {
      border: 1px solid var(--color-title);
      border-radius: 20px;
      padding: 0.1rem 2rem;
      cursor: pointer;
      background: var(--color-bg);
      color: var(--color-title);
    }
    
    /* Reglas para colores de iconos */
    .tags i svg,
    .specs i svg,
    .btn-close svg,
    .count i svg,
    .extras-icon svg {
      fill: var(--color-icon);
    }
    
    .fav-icon svg {
      fill: #000;
    }
    
    .fav-icon.fav svg {
      fill: var(--color-fav);
    }
  `;

  renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.3 ? 1 : 0;
    const empty = 5 - full - half;
    return `${'★'.repeat(full)}${half ? '⯪' : ''}${'☆'.repeat(empty)}`;
  }

  render() {
    if (!this.product) return html``;

    return html`
      <dialog>
        <div class="card">
          <div class="img-container">
            <i class="fav-icon ${this.isFav ? 'fav' : ''}" @click="${this.toggleFav}">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
              </svg>
            </i>
            <img src="${this.product.image}" alt="product" />
          </div>
          <div class="content-r">
            <div class="up">
              <div class="content">
                <div class="description">
                  <div class="categories">
                    <span style="color: var(--color-primary);">Categorías:</span> 
                    ${this.product.categories.join(', ')}
                  </div>
                  <h3 style="color: var(--color-title); margin: 0.2rem;">${this.product.title}</h3>
                  <div class="stars-price">
                    <div class="stars" style="font-size: 10px;">${this.renderStars(this.product.rating)}</div>
                    <div class="price">${this.product.price}</div>
                  </div>
                  <div class="tags-espects">
                    <div class="tags">
                      ${this.product.tags.slice(0, 3).map(tag => html`
                        <p style="font-size: 10px; margin: 0; display: flex; align-items: center;">
                          <i>
                            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 24 24" width="12">
                              <path d="M0 0h24v24H0V0z" fill="none"/>
                              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                            </svg>
                          </i>
                          <span style="margin-left: 0.2em;">${tag}</span>
                        </p>
                      `)}
                    </div>
                    <div class="specs">
                      <span style="color: var(--color-specs-label);">Especificaciones:</span> 
                      ${(Array.isArray(this.product.specifications)
                          ? this.product.specifications
                          : String(this.product.specifications).split(',').map(e => e.trim())
                        ).slice(0, 3).map(espec => html`
                        <p style="font-size: 10px; margin: 0; display: flex; align-items: center;">
                          <i>
                            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 24 24" width="12">
                              <path d="M0 0h24v24H0V0z" fill="none"/>
                              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                            </svg>
                          </i>
                          <span style="margin-left: 0.2em;">${espec}</span>
                        </p>
                      `)}
                    </div>
                  </div>
                  
                  <div class="extras">
                    <p style="font-size: 10px; margin: 0;">
                      <i class="extras-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px">
                          <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
                        </svg>
                      </i>
                      ${this.product.extras}
                    </p>
                  </div>
                </div>
              </div>
              <div class="btn-close" @click="${this.close}">
                <i>
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                  </svg>
                </i>
              </div>
            </div>
            <div class="down">
              <div class="actions">
                <div class="count">
                  <div @click="${this.decrementQuantity}" style="cursor: pointer;">
                    <i>
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                        <path d="M240-440v-80h480v80H240Z"/>
                      </svg>
                    </i>
                  </div>
                  <div class="quantity">${this.quantity}</div>
                  <div @click="${this.incrementQuantity}" style="cursor: pointer;">
                    <i>
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                      </svg>
                    </i>
                  </div>
                </div>
                <div class="btn-buy-now">Comprar ahora</div>
                <div class="btn-add-cart">Añadir al carrito</div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    `;
  }
}

customElements.define('product-detail-popup', ProductDetailPopup);