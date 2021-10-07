import React, { Component } from 'react';
import ProductCard from './Components/ProductCard';
import GoBackToTopButton from './Components/GoBackToTopButton';
import InfiniteScroll from './Components/InfiniteScroll';
import './ProductList.scss';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      totalCountDataFetched: 10,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchMoreData();
    return window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {}

  fetchMoreData = async () => {
    const LIST_API = '/data/ProductList/PRODUCT_LIST_DATA.json';

    const { totalCountDataFetched } = this.state;

    fetch(LIST_API)
      .then(res => {
        return res.json();
      })
      .then(data => {
        const duplicatedData = [...data.LIST_DATA.product];
        const newDatalistData = duplicatedData.slice(0, totalCountDataFetched);

        this.setState({
          listData: newDatalistData,
        });
      })
      .catch(console.error);
  };

  showLoadingSvg = resolve => {
    const { listData, totalCountDataFetched, loading } = this.state;
    return new Promise(resolve => {
      if (listData.length !== totalCountDataFetched) {
        this.setState({
          loading: false,
        });
      } else {
        this.setState({
          loading: !loading,
        });
        setTimeout(() => {
          resolve();
        }, 1000);
      }
    });
  };

  handleScroll = async () => {
    const { totalCountDataFetched, listData, loading } = this.state;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    let scrollTotalHeight = scrollHeight;
    let scrollHeightFromTop = scrollTop;
    let scrollHeightOfListCard = clientHeight;
    const isOverEndPointScroll =
      scrollHeightFromTop + scrollHeightOfListCard >= scrollTotalHeight;
    if (isOverEndPointScroll) {
      this.setState(
        {
          totalCountDataFetched: totalCountDataFetched + 10,
        },
        await this.showLoadingSvg()
      );
      this.fetchMoreData();
    }
  };

  render() {
    const { listData, loading, totalCountDataFetched } = this.state;
    console.log('1번순서 render, 현재 받아진 데이터 리스트', listData);
    console.log('1번 순서 render, 전체 데이터 갯수', listData.length);

    const noData = listData.length !== totalCountDataFetched;

    return (
      <main className='ProductList'>
        <div className='ProductComponentWrapper'>
          {listData &&
            listData.map(product => {
              const { id, image, subImage, detailImage, name, price } = product;
              return (
                <ProductCard
                  key={id}
                  image={image}
                  subImage={subImage}
                  detailImage={detailImage}
                  name={name}
                  price={price}
                  fetchMoreData={this.fetchMoreData}
                />
              );
            })}
        </div>
        {loading ? (
          <InfiniteScroll
            listData={listData}
            totalCountDataFetched={totalCountDataFetched}
          />
        ) : (
          ''
        )}
        {noData ? <GoBackToTopButton /> : ''}
      </main>
    );
  }
}

export default ProductList;
