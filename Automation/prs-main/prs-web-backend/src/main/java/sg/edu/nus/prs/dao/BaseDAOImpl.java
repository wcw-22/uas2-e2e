package sg.edu.nus.prs.dao;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import sg.edu.nus.prs.domain.util.PageableRequest;
import sg.edu.nus.prs.domain.util.PagedData;
import sg.edu.nus.prs.domain.util.SortBy;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class BaseDAOImpl {
    @Autowired
    @Qualifier("prsJdbcTemplate")
    protected JdbcTemplate prsJdbcTemplate;

    @Autowired
    @Qualifier("prsNamedJdbcTemplate")
    protected NamedParameterJdbcTemplate prsNamedJdbcTemplate;

    public void setPrsJdbcTemplate(JdbcTemplate prsJdbcTemplate) {
        this.prsJdbcTemplate = prsJdbcTemplate;
    }

    public void setPrsNamedJdbcTemplate(NamedParameterJdbcTemplate prsNamedJdbcTemplate) {
        this.prsNamedJdbcTemplate = prsNamedJdbcTemplate;
    }

    <T> PagedData<T> applyWithPagingAndSorting(PageableRequest request,
                                               String query, MapSqlParameterSource params,
                                               RowMapper<T> mapper) {
        PagedData<T> result = new PagedData<>();
        result.setFirst(true);
        result.setLast(true);

        // Need to 1. Get the data size count.
        //         2. Get the data according to the window.
        int totalSize = getTotalQuerySize(query, params);
        result.setTotalSize(totalSize);

        if (totalSize == 0) {
            result.setData(Collections.emptyList());
            return result;
        }

        StringBuilder wrapped = new StringBuilder();
        wrapped.append("SELECT * FROM (SELECT rownum AS paginate_rn, paginate_a.* FROM (");
        wrapped.append(query);
        if (CollectionUtils.isNotEmpty(request.getSortBy())) {
            List<SortBy> sortByList = request.getSortBy().stream()
                    .filter(sb -> sb.getField() != null && sb.getField() >= 0)
                    .collect(Collectors.toList());

            if (CollectionUtils.isNotEmpty(sortByList)) {
                wrapped.append(" ORDER BY ");
                wrapped.append(sortByList.stream()
                        .map(sb -> " " + sb.getField() + " " + sb.getDirection().toString())
                        .collect(Collectors.joining(", ")));
            }
        }

        wrapped.append(") paginate_a");
        wrapped.append(") paginate_b ");
        wrapped.append(" WHERE paginate_b.paginate_rn > :paginate_start AND paginate_b.paginate_rn <= :paginate_end ");

        int windowSize = 10; // <- Default.
        if (request.getWindowSize() != null) {
            if (request.getWindowSize() > 0) {
                windowSize = request.getWindowSize();
            } else if (request.getWindowSize() == -1) {
                // Code to retrieve all records.
                windowSize = totalSize;
            }
        }

        int page = 0;
        int start = 0;
        if (request.getPage() != null && request.getPage() >= 0) {
            page = request.getPage();
            start = page * windowSize;
        }

        int end = start + windowSize;

        params.addValue("paginate_start", start);
        params.addValue("paginate_end", end);

        List<T> resultList = this.prsNamedJdbcTemplate.query(wrapped.toString(), params, mapper);

        result.setData(resultList);
        result.setPageNumber(page);
        result.setPageSize(windowSize);
        result.setDataSize(resultList.size());

        int remainder = totalSize % windowSize;
        if (remainder == 0) {
            result.setTotalPages(totalSize / windowSize);
        } else {
            result.setTotalPages((totalSize / windowSize) + 1);
        }
        result.setFirst(page == 0);
        result.setLast((page + 1) == result.getTotalPages());

        return result;
    }

    private int getTotalQuerySize(String query, MapSqlParameterSource params) {
        Integer count =  this.prsNamedJdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM (" + query + ")",
                params, Integer.class);

        if (count == null) { return 0; }
        return count;
    }
}
