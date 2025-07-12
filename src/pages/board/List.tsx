import { useState, useEffect } from "react";
import { ListType } from "../../types/board";


const List: React.FC = ()  => {
  const [boardList, setBoardList] = useState<ListType[]>([]);
  return (
    <div>
      <p>게시판</p>
      <p>게시판 내용</p>
    </div>
  );
}

export default List;
