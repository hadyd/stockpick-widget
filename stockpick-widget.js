(function () {
  const containerId = 'stock-pick-widget';

  const styles = `
      @import url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans/css/SpoqaHanSansNeo.css');
      
      body {
        font-family: 'Spoqa Han Sans Neo', sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f8f9fa;
      }
      .stock-pick-container {
        max-width: 330px;
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
    `;

  const stockData = [
    {
      logo: 'https://i.ibb.co/zmJYpjd/BBCA.png',
      code: 'BBCA',
      name: 'PT Bank Central Asia Tbk',
      price: '10,500',
      percentage: '+20.34%',
      recommendation: 'BUY',
    },
    {
      logo: 'https://i.ibb.co/ryTbkrN/ITMG.png',
      code: 'ITMG',
      name: 'PT Indo Megah Tbk.',
      price: '4,200',
      percentage: '+17.67%',
      recommendation: 'BUY',
    },
    {
      logo: 'https://i.ibb.co/YQ34nsL/BMRI.png',
      code: 'BMRI',
      name: 'PT Bank Mandiri Tbk',
      price: '10,500',
      percentage: '-1.32%',
      recommendation: 'SELL',
    },
    {
      logo: 'https://i.ibb.co/Bt78J6b/BBRI.png',
      code: 'BBRI',
      name: 'PT Bank Rakyat Indonesia Tbk',
      price: '4,200',
      percentage: '+15.67%',
      recommendation: 'HOLD',
    },
    {
      logo: 'https://i.ibb.co/myPh6jX/BBNI.png',
      code: 'BBNI',
      name: 'PT Bank Negara Indonesia Tbk',
      price: '10,500',
      percentage: '+15.67%',
      recommendation: 'BUY',
    },
  ];

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
    item.href = 'https://fima.co.id/';
    item.target = '_blank';
    item.rel = 'noopener noreferrer';
    item.innerHTML = `
        <div class="coloumn-1">
          <img src="${logo}" alt="${code} logo" />
        </div>
        <div class="coloumn-2">
          <h2>${code}</h2>
          <p>${truncateText(name, 18)}</p>
        </div>
        <div class="coloumn-3">
          <span class="stock-price ${getColorClass(price)}">${price}</span>
          <span class="percentage ${getColorClass(
            percentage
          )}">${percentage}</span>
        </div>
        <div class="coloumn-4">
          <span class="stock-recommendation ${recommendation.toLowerCase()}">${recommendation}</span>
        </div>
      `;
    return item;
  };

  const loadWidget = () => {
    let styleTag = document.createElement('style');
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);

    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `
          <div class="stock-pick-container">
            <h1>Stock Pick Today</h1>
            <p>Displayed data covers the 12-month Target Price, Potential Change, and Trading Recommendations.</p>
            <div id="stock-list"></div>
            <p>
              Market data provided by 
              <a href="https://fima.co.id/" class="fima-link" target="_blank" rel="noopener noreferrer">Fima.co.id</a>
            </p>
          </div>
        `;

      const stockList = document.getElementById('stock-list');
      stockData.forEach((stock) => {
        stockList.appendChild(createStockItem(stock));
      });
    } else {
      console.error(`Container with ID "${containerId}" not found.`);
    }
  };

  if (!window.stockPickWidgetLoaded) {
    window.stockPickWidgetLoaded = true;
    loadWidget();
  }
})();
