import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

export default class Paginator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav aria-label="...">
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
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