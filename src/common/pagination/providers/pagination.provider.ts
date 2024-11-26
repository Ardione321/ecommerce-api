import { Inject, Injectable } from "@nestjs/common";
import { FastifyRequest } from 'fastify';
import { ObjectLiteral, Repository } from "typeorm";
import { PaginationQueryDto } from "../dtos/pagination-query.dto";
import { Paginated } from "../interfaces/pagination.interface";
import { REQUEST } from "@nestjs/core";
@Injectable()
export class PaginationProvider {
    constructor(
        @Inject(REQUEST)
        private readonly request: FastifyRequest, 
    ) {}

    /**
     * Paginates a query using the provided repository and pagination query DTO.
     * Returns a Paginated<T> object containing the paginated data and metadata.
     *
     * This function takes a pagination query and a repository as parameters.
     * It uses the skip and take methods of the repository to paginate the query.
     * The page and limit parameters are used to calculate the offset and limit
     * of the query. The offset is used to skip over the number of items
     * specified by the page parameter, and the limit is used to limit the
     * number of items returned.
     *
     * The function also calculates the total number of pages and the next and
     * previous page numbers based on the total number of items and the current
     * page number.
     *
     * Finally, the function returns a Paginated<T> object containing the
     * paginated data and metadata. The metadata includes the items per page,
     * total items, current page, total pages, and links to the first, last,
     * current, next, and previous pages.
     *
     * @param paginationQuery - The pagination query to use.
     * @param repository - The repository to paginate.
     * @returns A Paginated<T> object containing the paginated data and metadata.
     */
    public async paginateQuery<T extends ObjectLiteral>(paginationQuery: PaginationQueryDto, repository: Repository<T>): Promise<Paginated<T>> {
        // Get the page and limit parameters from the pagination query.
        const { page, limit } = paginationQuery;
        // Calculate the offset based on the page number and limit.
        const offset = (page - 1) * limit;

        // Execute the query using the skip and take methods of the repository.
        const [data, totalItems] = await repository.findAndCount({ skip: offset, take: limit });

        // Calculate the total number of pages based on the total number of items and the limit.
        const totalPages = Math.ceil(totalItems / limit);
        // Calculate the next and previous page numbers based on the current page number.
        const nextPage = page < totalPages ? page + 1 : totalPages;
        const previousPage = page > 1 ? page - 1 : 1;

        // Create a new URL object from the request URL.
        const baseUrl = `${this.request.protocol}://${this.request.hostname}`;
        const requestUrl = new URL(this.request.url, baseUrl);

        // Return a Paginated<T> object containing the paginated data and metadata.
        return {
            // The paginated data.
            data,
            // The metadata.
            meta: {
                // The number of items per page.
                itemsPerPage: limit,
                // The total number of items.
                totalItems,
                // The current page number.
                currentPage: page,
                // The total number of pages.
                totalPages,
            },
            // The links to the first, last, current, next, and previous pages.
            links: {
                // The URL of the first page.
                first: `${requestUrl.origin}${requestUrl.pathname}?limit=${limit}&page=1`,
                // The URL of the last page.
                last: `${requestUrl.origin}${requestUrl.pathname}?limit=${limit}&page=${totalPages}`,
                // The URL of the current page.
                current: `${requestUrl.origin}${requestUrl.pathname}?limit=${limit}&page=${page}`,
                // The URL of the next page.
                next: `${requestUrl.origin}${requestUrl.pathname}?limit=${limit}&page=${nextPage}`,
                // The URL of the previous page.
                previous: `${requestUrl.origin}${requestUrl.pathname}?limit=${limit}&page=${previousPage}`,
            },
        };
    };
}
