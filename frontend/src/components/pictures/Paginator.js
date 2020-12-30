import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

export default class Paginator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const currentPage = this.props.page;
        const nextLink = this.props.next_link;
        const prevLink = this.props.prev_link;

        return (
            <nav aria-label="...">
                <Pagination>
                    <Previous currentPage={this.props.page} prevLink={this.props.prev_link} handle_page_change={this.props.handle_page_change}/>
                    <Next currentPage={this.props.page} nextLink={this.props.next_link} handle_page_change={this.props.handle_page_change}/>
                </Pagination>
                {/* <ul class="pagination">
                    {% if page_obj.has_previous %}
                        <li class="page-item">
                            <a class="page-link" href="?page={{ page_obj.previous_page_number }}">Previous</a>
                        </li>
                    {% else %}
                        <li class="page-item disabled">
                            <a class="page-link" href="#" aria-disabled="true">Previous</a>
                        </li>
                    {% endif %}
                    {% for count in page_obj.paginator.page_range %}
                        {% if page_obj.number == count %}
                            <li class="page-item active" aria-current="page">
                                <a class="page-link" href="?page={{ count }}">{{ count }}<span class="sr-only">(current)</span></a>
                            </li>
                        {% else %}
                            <li class="page-item"><a class="page-link" href="?page={{ count }}">{{ count }}</a></li>
                        {% endif %}
                    {% endfor %}
                    {% if page_obj.has_next %}
                        <li class="page-item">
                            <a class="page-link" href="?page={{ page_obj.next_page_number }}">Next</a>
                        </li>
                    {% else %}
                        <li class="page-item disabled">
                            <a class="page-link" href="#" aria-disabled="true">Next</a>
                        </li>
                    {% endif %}
                </ul> */}
            </nav>
        )
    }
}

function Previous(props) {
    const currentPage = props.currentPage;
    const prevLink = props.prevLink;
    if (prevLink) {
        return <Pagination.Prev onClick={link => props.handle_page_change(prevLink)} value={prevLink}/>;
    } else {
        return <Pagination.Prev disabled={true}/>
    }
}

function Next(props) {
    const currentPage = props.currentPage;
    const nextLink = props.nextLink;
    console.log(nextLink);
    if (nextLink) {
        return <Pagination.Next onClick={link => props.handle_page_change(nextLink)} value={nextLink}/>;
    } else {
        return <Pagination.Next disabled={true}/>;
    }
}