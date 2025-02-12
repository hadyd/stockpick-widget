(function () {
  const containerId = 'stock-pick-widget';
  const API_URL =
    'https://api.prd.miraeasset.co.id/services/financialdata/api/stock-pick';

  const styles = `
@import url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans/css/SpoqaHanSansNeo.css');

body {
  font-family: 'Spoqa Han Sans Neo', sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f8f9fa;
}
.stock-pick-container {
  width: 100%;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
.stock-pick-container h1 {
  font-size: 24px;
  margin-bottom: 25px;
  font-weight: 700;
  line-height: 1;
}
.stock-pick-container p {
  color: #6c757d;
  font-size: 14px;
  line-height: 20px;
}
.fima-link {
  color: #f58220;
  text-decoration: none;
  font-weight: bold;
}
.stock-list {
  margin-top: 20px;
}
.stock-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #dfe2e5;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  margin-bottom: 10px;
  text-decoration: none;
  color: inherit;
}
.stock-item .coloumn-1 {
  margin-right: 10px;
  width: 13%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.stock-item .coloumn-1 img {
  width: 40px;
  border-radius: 50%;
}
.stock-item .coloumn-2 {
  margin-right: 10px;
  align-items: center;
}
.stock-item .coloumn-2 h2 {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  line-height: 24px;
  color: #313233;
}
.stock-item .coloumn-2 p {
  font-size: 12px;
  font-weight: 400;
  margin: 0;
  color: #959799;
}
.stock-item .coloumn-3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  width: 65px;
  height: 24px;
}
.stock-item .coloumn-3 .stock-price,
.stock-item .coloumn-3 .percentage {
  position: absolute;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}

.stock-price,
.percentage {
  position: absolute;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  animation: slide-up-down 6s infinite;
}

.percentage {
  animation-delay: 3s;
}
.positive {
  color: #43936c;
}
.negative {
  color: #d9534f;
}
.stock-item .coloumn-4 {
  margin-left: auto;
}
.stock-item .coloumn-2 {
  width: 120px;
}
.stock-item .coloumn-4 .stock-recommendation {
  padding: 5px 15px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
}
.stock-recommendation.buy {
  background-color: #c5e8d7;
  color: #43936c;
}
.stock-recommendation.sell {
  background-color: #f9e3e3;
  color: #cb3a31;
}
.stock-recommendation.hold {
  background-color: #f2f3f5;
  color: #313233;
}
@keyframes slide-up-down {
  0%,
  20% {
    transform: translateY(0);
    opacity: 1;
  }
  40% {
    transform: translateY(-100%);
    opacity: 0;
  }
  60% {
    transform: translateY(100%);
    opacity: 0;
  }
  80%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.stock-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}

.stock-logo.fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f58220;
  color: white;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
}
.credit {
  margin-bottom: 13px !important;
}
.il-banner {
  width: 100px;
}
.banner-text {
  font-weight: 700;
  font-size: 13px !important;
  line-height: 16.28px;
  color: #f58220 !important;
}
.il-store {
  width: 86px;
  cursor: pointer;
}
.il-banner-container {
  justify-content: center;
  display: flex;
}

.line {
  border-top: 1px solid #e0e0e0;
  padding-bottom: 18px;
}

.banner-container {
  border-radius: 8px;
  align-items: center;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 4px 8px 0px #0000001a;
  padding: 10px;
  display: grid;
  grid-template-columns: 63% 40%;
  gap: 10px;
}

@media (max-width: 768px) {
  .banner-text {
    font-size: 12px !important;
  }
  .il-banner {
    width: 90px;
  }
}

#see-more-btn,
#see-less-btn {
  display: block;
  padding: 10px 20px;
  background-color: #f58220;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}
.action-btn {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0px;
}
  `;

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const getColorClass = (value) => {
    return value.startsWith('-') ? 'negative' : 'positive';
  };

  const createStockItem = ({
    logo,
    code,
    name,
    price,
    percentage,
    recommendation,
  }) => {
    const item = document.createElement('a');
    item.className = 'stock-item';
    item.href = 'https://fima.co.id/?channel=fima-blog';
    item.target = '_blank';
    item.rel = 'noopener noreferrer';

    item.innerHTML = `
    <div class="coloumn-1">
      <img
        class="stock-logo"
        src="${logo}"
        onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';"
        alt="${code}"
      />
      <div class="stock-logo fallback" style="display: none">
        ${code.slice(0, 2)}
      </div>
    </div>
    <div class="coloumn-2">
      <h2>${code}</h2>
      <p>${truncateText(name, 18)}</p>
    </div>
    <div class="coloumn-3">
      <span class="stock-price ${getColorClass(price)}">${price}</span>
      <span class="percentage ${getColorClass(percentage)}"
        >${percentage}</span
      >
    </div>
    <div class="coloumn-4">
      <span class="stock-recommendation ${recommendation.toLowerCase()}"
        >${recommendation}</span
      >
    </div>
      `;
    return item;
  };

  const fetchStockData = async () => {
    try {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const x = data.data.map((stock) => {
        const ticker = stock.attributes.master_stock.data.attributes.ticker;
        const fallbackLogo = `https://via.placeholder.com/40/FFA500/FFFFFF?text=${ticker.substring(
          0,
          2
        )}`;

        return {
          logo:
            `https://storage.googleapis.com/mirae-webresearch-prd/stocks/${ticker}.png` ||
            fallbackLogo,
          code: ticker,
          name: stock.attributes.master_stock.data.attributes.name,
          price: Number(
            stock.attributes.master_stock.data.attributes.close_price
          ).toLocaleString('id-ID'),
          percentage: `${Number(
            stock.attributes.master_stock.data.attributes.change_percent
          ).toFixed(2)}%`,
          recommendation: stock.attributes.Recommendation,
        };
      });
      return x;
    } catch (error) {
      console.error('Failed to fetch stock data:', error);
      return [];
    }
  };

  const loadWidget = async () => {
    let styleTag = document.createElement('style');
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);

    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `
      <div class="stock-pick-container">
      <h1>Stock Pick Today</h1>
      <p>
        Displayed data covers the 12-month Target Price, Potential Change, and
        Trading Recommendations.
      </p>
      <div id="stock-list"></div>
      <div class="action-btn">
      <button id="see-more-btn" style="display: none">See More</button>
      <button id="see-less-btn" style="display: none">See Less</button>
      </div>
      <p class="credit">
        Market data provided by
        <a
          href="https://fima.co.id/?channel=fima-blog"
          class="fima-link"
          target="_blank"
          rel="noopener noreferrer"
          >Fima.co.id</a
        >
      </p>
      <div class="line"></div>
      <div class="banner-container">
        <div>
          <p class="banner-text">
            Trade with MAIA on M-STOCK, so you don’t have to trade your future
          </p>
          <div>
            <a
              href="https://apps.apple.com/app/m-stock/id1670096144"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="il-store"
                src="https://storage.googleapis.com/mirae-webresearch-prd/mstock/AppStore.png"
                alt="Download M-STOCK App Store"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=id.co.miraeasset.stock"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="il-store"
                src="https://storage.googleapis.com/mirae-webresearch-prd/mstock/googlePlay.png"
                alt="Download M-STOCK Play Store"
              />
            </a>
          </div>
        </div>
        <div class="il-banner-container">
          <img
            class="il-banner"
            src="https://cdn.miraeasset.co.id/popnotif/Illustration-1.png"
            alt="MAIA logo"
          />
        </div>
      </div>
    </div>
          `;

      const stockList = document.getElementById('stock-list');
      const seeMoreBtn = document.getElementById('see-more-btn');
      const seeLessBtn = document.getElementById('see-less-btn');
      const stockData = await fetchStockData();

      if (stockData.length) {
        const initialData = stockData.slice(0, 5);
        const remainingData = stockData.slice(5);

        initialData.forEach((stock) => {
          stockList.appendChild(createStockItem(stock));
        });

        if (remainingData.length > 0) {
          seeMoreBtn.style.display = 'block';
          seeMoreBtn.addEventListener('click', () => {
            remainingData.forEach((stock) => {
              stockList.appendChild(createStockItem(stock));
            });
            seeMoreBtn.style.display = 'none';
            seeLessBtn.style.display = 'block';
          });
        }

        seeLessBtn.addEventListener('click', () => {
          stockList.innerHTML = '';
          initialData.forEach((stock) => {
            stockList.appendChild(createStockItem(stock));
          });
          seeMoreBtn.style.display = 'block';
          seeLessBtn.style.display = 'none';
        });
      } else {
        stockList.innerHTML = '<p>No stock data available at the moment.</p>';
      }
    } else {
      console.error(`Container with ID "${containerId}" not found.`);
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (!window.stockPickWidgetLoaded) {
      window.stockPickWidgetLoaded = true;
      loadWidget();
    }
  });
})();
