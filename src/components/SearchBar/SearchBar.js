import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    sortByOptions = {
        '最佳匹配': 'best_match',
        '最高评级': 'rating',
        '最多光顾': 'review_count'  
    };

    getSortByClass(sortByOption) {
        if(this.state.sortBy === sortByOption) {
            return 'active';
        }
        return '';
    }

    // Handle State Changes
    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption
        });
    }
    handleTermChange(event) {
        this.setState({
            term: event.target.value
        });
    }
    handleLocationChange(event) {
        this.setState({
            location: event.target.value
        });
    }
    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return (
                <li 
                    className={this.getSortByClass(sortByOptionValue)}
                    key={sortByOptionValue}
                    onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                        {sortByOption}
                </li>
            );
        });
    }
    
    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input onChange={this.handleTermChange} placeholder="英文输入想要搜索的商家饭店/旅馆/机场...：）" />
                    <input onChange={this.handleLocationChange} placeholder="英文输入国家和地区：）" />
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch}>一起去看看</a>
                </div>
            </div>
        );
    }
}

export default SearchBar;