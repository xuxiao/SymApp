import { observable, action } from 'mobx';

class Home {
  @observable list;
  @observable isLoading;
  @observable pageIndex;
  @observable pageTotal;
  @observable pathname;

  constructor() {
    this.list = [];
    this.isLoading = true;
    this.pageIndex = 0;
    this.pageTotal = 0;
    this.pathname = '';
  }

  @action setList = (list) => {
    this.list = list;
  };

  @action setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  @action setPathname = (pathname) => {
    this.pathname = pathname;
  };

  @action setPage = (pageIndex, pageTotal) => {
    this.pageIndex = pageIndex;
    this.pageTotal = pageTotal;
  }
}


const home = new Home();
export default home;
export { Home };
