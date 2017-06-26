/**
 * Created by weijian on 2017/6/23.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './page.css'

class Page extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage:1
        }
    }
    toPage(type){
        if(type == 'prev'){
            this.setState({currentPage:this.state.currentPage-1},function(){
                    this.onChangeToParent.call(this)
                }
            )
        }else if(type == 'next'){
            this.setState({currentPage:this.state.currentPage+1},
                this.onChangeToParent.call(this)

            )
        }else{
            this.setState({currentPage:type},function(){
                this.onChangeToParent.call(this)
                }
            )
        }
    }
    onChangeToParent(){
        this.props.onChange && this.props.onChange(this.state.currentPage)
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
                { currentPage == 1 ? '' : <a href="javascript:;" className="prev" onClick={this.toPage.bind(this,'prev')}>上一页</a>}
                { pagebox }
                { currentPage == totalPage ? '' :<a href="javascript:;" className="next" onClick={this.toPage.bind(this,'next')}>下一页</a>}
            </section>
        )
    }
}
export default Page
