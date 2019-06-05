import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import {Card, Comment, CommentGroup, Header} from 'semantic-ui-react';
let articleJson = [];

class App extends Component {
    state ={
        article: [{
                title: null,
                comments: [{
                    avatar:null,
                        author: null,
                        text: null
                }]
        }],
        id: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
    };
    // when component mounts, first thing it does is fetch all existing data from our db
    componentDidMount() {
        this.getArticleFromDb();
        if (!this.state.intervalIsSet) {
            let interval =
setInterval(this.getArticleFromDb, 1000);
            this.setState({ intervalIsSet: interval });
        }
    }
    // kills a process everytime is used
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }
    // fetch data from DB
    getArticleFromDb = () => {
        fetch('http://localhost:3001/api/getArticle')
            .then((article) => article.json())
            .then((res) => this.setState({ article: res.article }));
    };

    // create new query into in DB
    putArticleToDB = (message) => {
        let currentIds = this.state.article.map((article) => article.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }
        axios.post('http://localhost:3001/api/putArticle', {
            id: idToBeAdded,
            message: message,
        });
    };
    // remove data from  database
    deleteFromDB = (idTodelete) => {
        parseInt(idTodelete);
        let objIdToDelete = null;
        this.state.article.forEach((dat) => {
            if (dat.id === idTodelete) {
                objIdToDelete = dat._id;
            }
        });
        axios.delete('http://localhost:3001/api/deleteArticle', {
            article: {
                id: objIdToDelete,
            },
        });
    };
    //UPDATE data from DB
    updateDB = (idToUpdate, updateToApply) => {
        let objIdToUpdate = null;
        parseInt(idToUpdate);
        this.state.article.forEach((dat) => {
            if (dat.id === idToUpdate) {
                objIdToUpdate = dat._id;
            }
        });

        axios.post('http://localhost:3001/api/updateArticle', {
            id: objIdToUpdate,
            update: { message: updateToApply },
        });
    };

    render(){
    let rows =[];


        if (this.state.article === undefined){

            this.setState(
                {
                        article: [
                            {
                                title: 'What you think about react',
                                comments:
                                    [
                                        {
                                            avatar: "https://scontent.fprg1-1.fna.fbcdn.net/v/t1.0-9/37528094_10204918782887188_8597874629320638464_n.jpg?_nc_cat=102&_nc_ht=scontent.fprg1-1.fna&oh=2da46aa4c6250dedc605775189a0a679&oe=5D553805",
                                                author: "Jsme Wuči",
                                                text: "Čahoj světoune",

                                        },
                                        {
                                            avatar: "https://scontent.fprg1-1.fna.fbcdn.net/v/t1.0-9/37528094_10204918782887188_8597874629320638464_n.jpg?_nc_cat=102&_nc_ht=scontent.fprg1-1.fna&oh=2da46aa4c6250dedc605775189a0a679&oe=5D553805",
                                                author: "Jsme Wuči",
                                                text: "Čahoj světoune",

                                        }
                                    ]
                            }
                        ]
                    }
            );
        }
        let article = this.state.article[0];
        console.log (article);
        if (article === undefined){
articleJson=[];
        }else{
            articleJson = article.comments;
            console.log (articleJson);
    for (let i = 0; i < articleJson.length;i++){
        rows.push(<Comment>
            <Comment.Avatar src ={articleJson[i].avatar}/>
            <Comment.Content>
                <Comment.Author>
                    {articleJson[i].author}
                </Comment.Author>
                <Comment.Metadata>{articleJson[i].createdAt}</Comment.Metadata>
                <Comment.Text>
                    {articleJson[i].text}
                </Comment.Text>
            </Comment.Content>
            <Comment.Action>Reply</Comment.Action>
        </Comment>);
    }
        }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
      <main className="App-main">
          <Card style={{padding:'10px',margin:'10px'}}>
          <CommentGroup>
              <Header as='h3' dividing>
                  Comments
              </Header>
              {rows}
          </CommentGroup>
          </Card>
      </main>
    </div>
  );
    }
}

export default App;
