/**
 * Created by weijian on 2017/6/13.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './comment.css'
import Page from '../page/page';
import axios from 'axios'

const comment = require('../data/comment.json');

class Comment extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <section>
                <CommentSend/>
                <CommentList/>
                <CommentSend/>

            </section>
        )
    }
}

class CommentList extends Component {
    render(){
        const commentItem = comment.comment.map((item,index) =>
                    <CommentItem
                        key = {index}
                        details = {item}
                    />
        )
        return (
            <section>
                <ul className="comment-list">
                    {commentItem}
                </ul>
            </section>

        )
    }
}
class CommentItem extends Component {
    constructor(props){
        super(props);
        this.triggleReply = this.triggleReply.bind(this);
        this.childrenReply = this.childrenReply.bind(this);
        this.pageOnChange = this.pageOnChange.bind(this);
        this.state = {
            replyVisible : false,
            commentValue: ''
        }
    }
    triggleReply(){
        this.setState({ commentValue : ''});
        if(!this.state.replyVisible){
            this.setState({ replyVisible: true})
        }
    }
    childrenReply(nick){
        this.setState({ commentValue: "@"+nick+":" })
        if(!this.state.replyVisible){
            this.setState({ replyVisible: true})
        }

    }
    pageOnChange(pageNum){
        console.log(pageNum)
    }
    render(){
        let replyInput = null;
        let props = this.props.details;
        if(this.state.replyVisible){
            replyInput = <CommentSend commentValue={this.state.commentValue}/>;
        }
        const ReplyList = props.reply.map((item,index) =>
            <CommentReplyItem
                key = {index}
                details = {item}
                onChildReply = {this.childrenReply}
            />
        )
        return (
            <li>
                <div className="avatar-box">
                    <img className="avatar" src={props.avatar} />
                </div>
                <div className="details">
                    <div className="name">
                        {props.nick}
                    </div>
                    <div className="content">
                        {props.content}
                    </div>
                    <div className="info">
                        <span className="floor">#{props.floor}</span>
                        <span className="time">{props.time}</span>
                        <span className="like">({props.zan})</span>
                        <span className="hate"></span>
                        <span className="reply" onClick={this.triggleReply}>参与回复</span>
                        <span className="report">举报</span>
                        <span className="blacklist">加入黑名单</span>
                    </div>
                    <ul className="reply-list">
                        { ReplyList }
                        <Page totalPage="10" onChange={this.pageOnChange}/>
                        { replyInput }
                    </ul>

                </div>
            </li>
        )
    }
}
class CommentReplyItem extends Component {
    constructor(props){
        super(props);
    }
    triggleReply(nick){
        this.props.onChildReply(nick)
    }
    render() {
        const props = this.props.details;
        return (
            <li>
                <div className="avatar-box">
                    <img className="avatar" src={props.avatar} />
                </div>
                <div className="details">
                    <div className="name">
                        {props.nick}
                    </div>
                    <div className="content">
                        {props.content}
                    </div>
                    <div className="info">
                        <span className="time">{props.time}</span>
                        <span className="like">({props.zan})</span>
                        <span className="hate"></span>
                        <span className="reply" onClick={this.triggleReply.bind(this, props.nick)}>回复</span>
                        <span className="report">举报</span>
                        <span className="blacklist">加入黑名单</span>
                    </div>
                </div>
            </li>
        )
    }
}

class CommentSend extends Component {
    constructor(props){
        super(props);
        this.appendEmoji = this.appendEmoji.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.focus = this.focus.bind(this);
        this.state = {
            commentValue:"",
        }
    }
    componentDidMount(){
        this.focus();
        if(this.props.commentValue){
            this.setState({commentValue:this.props.commentValue})
        }
    }
    componentWillReceiveProps(nextProps){
        // emojibox也会传递参数，注意！！！
        this.focus();
        this.setState({commentValue:nextProps.commentValue})
    }
    focus(){
        this.textarea.focus();
    }
    handleChange(event) {
        // this.props.commentValue = event.target.value;
        this.setState({commentValue: event.target.value});
    }
    appendEmoji(item){
        console.log(this,item)
        this.setState({commentValue:this.state.commentValue+item});
    }
    render(){
        return (
            <div className="comment-send">
                <div className="user-face">
                    <img className="avatar" src="//i0.hdslb.com/bfs/face/b7f7c8e376ef60f00f881bada6257a5538ad7cd6.jpg@52w_52h.webp" />
                </div>
                <div className="textarea-container">
                    <textarea
                        value={this.state.commentValue}
                        onChange={this.handleChange}
                        className="send-comment-input" cols="80" rows="5"
                        placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
                        ref = {(textarea) => {this.textarea = textarea}}
                    >

                    </textarea>
                    <button className="comment-submit">发表评论</button>
                </div>
                <EmojiBox onEmojiSelect={this.appendEmoji}/>
            </div>
        )
    }
}
class EmojiBox extends Component{
    constructor(props){
        super(props);
        this.showEmojiBox = this.showEmojiBox.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = { expanded: false }
    }
    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, false);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
    }
    handleClickOutside(e){
        if(ReactDOM.findDOMNode(this).contains(e.target)){
            this.setState({expanded:true})
        }else{
            this.setState({expanded:false})
        }
    }
    showEmojiBox(){
        this.setState({expanded:true})
    }
    appendEmoji(item){
        this.props.onEmojiSelect(item)
    }
    render(){
        let details;
        const emojiArr = [
          '(⌒▽⌒)',
          '（￣▽￣）',
          '(=・ω・=)',
          '(｀・ω・´)',
          '(〜￣△￣)〜',
            '(･∀･)',
            '(°∀°)ﾉ'
        ];
        const emojiList = emojiArr.map((item,index)=><span onClick={this.appendEmoji.bind(this,item)} key={index}>{item}</span>);
        if(this.state.expanded){
            details = <div className="emoji-box">
                <div className="emoji-title">颜文字</div>
                <div className="emoji-wrap">
                    { emojiList }
                </div>
                <div className="emoji-tabs">
                    <img src="//static.hdslb.com/images/base/emoji-tab-default.png" />
                </div>
            </div>
        } else {
            details = undefined;
        }
        return (
            <section className="emoji-container" >
                <div className="comment-emoji"  tabIndex="0" onClick={this.showEmojiBox}>
                    <span className="text">表情</span>
                </div>
                {details}
            </section>
        )
    }
}
export default Comment
