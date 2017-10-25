import React from 'react';
import * as APIHelpers from './utils/APIHelpers';
import QuoteBox from './components/QuoteBox';
import themeSet from './utils/themes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAuthor: '',
      theme: {}
    };
  }

  componentDidMount() {
    this._newQuote();
  }

  _newQuote = () => {
    const options = {
      cache: 'default',
      dataType: 'jsonp',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'GET'
    };

    const url = 'https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&json=?';

    APIHelpers.apiSkeleton(url, options, this._onQuoteSuccess, this._onQuoteFail);
  }

  _onQuoteSuccess = (res) => {
    const theme = Math.floor(Math.random() * themeSet.length);
    this.setState({
      currentQuote: res.quoteText,
      currentAuthor: res.quoteAuthor,
      theme: themeSet[theme]
    }, () => {
      document.body.style.backgroundColor = this.state.theme.colorbg;
    });
  }

  _onQuoteFail = (error) => {
    console.warn(error);
    this._newQuote();
  }

  render() {
    return (<QuoteBox
      currentQuote={this.state.currentQuote}
      currentAuthor={this.state.currentAuthor}
      getQuote={this._newQuote}
      theme={this.state.theme}
    />);
  }
}

export default App;