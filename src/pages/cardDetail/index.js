import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const CardDetail = (props) => {
  const [{ cardDetailResponse }, cardDetailFetch] = useFetch(
    `/posts/${props.match.params.id}`
  );
  const [{ commentsResponse }, commentsFetch] = useFetch(`/comments/`);

  useEffect(() => {
    cardDetailFetch();
    commentsFetch();
  }, [cardDetailFetch, commentsFetch]);

  return (
    <>
      {cardDetailResponse && <div>{cardDetailResponse.data.title}</div>}

      {commentsResponse && (
        <div>
          {commentsResponse.map((comment) => {
            if (comment.postId === props.match.params.id) {
              return <div>{comment.text}</div>;
            }
            return <div>Test</div>;
          })}
        </div>
      )}
    </>
  );
};

export default CardDetail;
