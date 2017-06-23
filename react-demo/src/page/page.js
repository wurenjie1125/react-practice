/**
 * Created by weijian on 2017/6/23.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './page.css'

class Page extends Component {
    constructor(props){
        super(props);
        this.toNextPage = this.toNextPage.bind(this);
        this.toPrevPage = this.toPrevPage.bind(this);
        this.state = {
            currentPage:6
        }
    }
    toNextPage(){
        this.setState({currentPage:++this.state.currentPage})
    }
    toPrevPage(){
        this.setState({currentPage:--this.state.currentPage})
    }
    toPage(index){
        this.setState({currentPage:index})

    }
    render(){
        const totalPage = this.props.totalPage;
        const currentPage = this.state.currentPage;
        let pagebox = [];
        for(let i=1;i<currentPage;i++){
            if(i<currentPage-2 && i>1){
                if(i == currentPage-3){
                    pagebox.push(<span>...</span>)
                }
                continue;
            }
            pagebox.push(<a className="page-num" onClick={this.toPage.bind(this,i)}>{i}</a>)
        }
        pagebox.push(<a className="page-num current">{currentPage}</a>)
        for(let i=currentPage+1;i<=totalPage;i++){
            if(i>currentPage+2 && i<totalPage){
                if(i == currentPage+3){
                    pagebox.push(<span>...</span>)
                }
                continue;
            }
            pagebox.push(<a className="page-num" onClick={this.toPage.bind(this,i)}>{i}</a>)
        }
        return (
            <section className="page-container">
                <span className="totle-page">共{totalPage}页</span>
                { currentPage == 1 ? '' : <a href="javascript:;" className="prev" onClick={this.toPrevPage}>上一页</a>}
                { pagebox }
                { currentPage == totalPage ? '' :<a href="javascript:;" className="next" onClick={this.toNextPage}>下一页</a>}
            </section>
        )
    }
}
export default Page