set Foreign_key_checks = 0;

truncate table replytable;
truncate table boardtable;
truncate table usertable;

set Foreign_key_checks = 1;

--email 1111@1111.com 비번 1111111
INSERT INTO usertable (
    user_email,
    user_password,
    user_nickname,
    user_img,
    user_role,
    user_create_at,
    user_update_at
    ) VALUES (
    '1111@1111.com',
    '$2a$10$hC3rU3P2UrXSZtHgLDkvI.a1YaHs0T5YgQ22SS1c2wq.QSSxK9wbS',
    '관리자1',
    'default.jpg',
    'admin',
    now(),
    now()
);

-- 정보 카테고리
INSERT INTO boardtable (board_category, board_title, board_content, board_img, board_create_at, board_update_at, user_no) VALUES
('정보', '정보 1번 글', '정보 카테고리의 1번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('정보', '정보 2번 글', '정보 카테고리의 2번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('정보', '정보 3번 글', '정보 카테고리의 3번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('정보', '정보 4번 글', '정보 카테고리의 4번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('정보', '정보 5번 글', '정보 카테고리의 5번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('정보', '정보 6번 글', '정보 카테고리의 6번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('정보', '정보 7번 글', '정보 카테고리의 7번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('정보', '정보 8번 글', '정보 카테고리의 8번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('정보', '정보 9번 글', '정보 카테고리의 9번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('정보', '정보 10번 글', '정보 카테고리의 10번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1);

-- 에러 카테고리
INSERT INTO boardtable (board_category, board_title, board_content, board_img, board_create_at, board_update_at, user_no) VALUES
('에러', '에러 1번 글', '에러 카테고리의 1번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('에러', '에러 2번 글', '에러 카테고리의 2번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('에러', '에러 3번 글', '에러 카테고리의 3번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('에러', '에러 4번 글', '에러 카테고리의 4번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('에러', '에러 5번 글', '에러 카테고리의 5번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('에러', '에러 6번 글', '에러 카테고리의 6번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('에러', '에러 7번 글', '에러 카테고리의 7번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('에러', '에러 8번 글', '에러 카테고리의 8번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('에러', '에러 9번 글', '에러 카테고리의 9번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('에러', '에러 10번 글', '에러 카테고리의 10번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1);

-- 자유 카테고리
INSERT INTO boardtable (board_category, board_title, board_content, board_img, board_create_at, board_update_at, user_no) VALUES
('자유', '자유 1번 글', '자유 카테고리의 1번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('자유', '자유 2번 글', '자유 카테고리의 2번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('자유', '자유 3번 글', '자유 카테고리의 3번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('자유', '자유 4번 글', '자유 카테고리의 4번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('자유', '자유 5번 글', '자유 카테고리의 5번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('자유', '자유 6번 글', '자유 카테고리의 6번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('자유', '자유 7번 글', '자유 카테고리의 7번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('자유', '자유 8번 글', '자유 카테고리의 8번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('자유', '자유 9번 글', '자유 카테고리의 9번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('자유', '자유 10번 글', '자유 카테고리의 10번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1);

-- 질문 카테고리
INSERT INTO boardtable (board_category, board_title, board_content, board_img, board_create_at, board_update_at, user_no) VALUES
('질문', '질문 1번 글', '질문 카테고리의 1번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('질문', '질문 2번 글', '질문 카테고리의 2번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('질문', '질문 3번 글', '질문 카테고리의 3번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('질문', '질문 4번 글', '질문 카테고리의 4번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('질문', '질문 5번 글', '질문 카테고리의 5번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('질문', '질문 6번 글', '질문 카테고리의 6번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('질문', '질문 7번 글', '질문 카테고리의 7번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('질문', '질문 8번 글', '질문 카테고리의 8번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('질문', '질문 9번 글', '질문 카테고리의 9번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('질문', '질문 10번 글', '질문 카테고리의 10번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1);

-- 후기 카테고리
INSERT INTO boardtable (board_category, board_title, board_content, board_img, board_create_at, board_update_at, user_no) VALUES
('후기', '후기 1번 글', '후기 카테고리의 1번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('후기', '후기 2번 글', '후기 카테고리의 2번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('후기', '후기 3번 글', '후기 카테고리의 3번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('후기', '후기 4번 글', '후기 카테고리의 4번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('후기', '후기 5번 글', '후기 카테고리의 5번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('후기', '후기 6번 글', '후기 카테고리의 6번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('후기', '후기 7번 글', '후기 카테고리의 7번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('후기', '후기 8번 글', '후기 카테고리의 8번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1),
('후기', '후기 9번 글', '후기 카테고리의 9번째 게시글입니다.', 'default.jpg', NOW(), NOW(), 1),
('후기', '후기 10번 글', '후기 카테고리의 10번째 게시글입니다.', 'default.jpg', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), 1);




INSERT INTO replytable (
    reply_content,
    reply_create_at,
    reply_update_at,
    board_no,
    user_no
) VALUES
-- 정보 (board_no 1~10)
('정보 게시글에 관한 내용입니다. 예시로 작성된 댓글입니다.', NOW(), NOW(), 1, 1),
('정보 관련된 내용이 잘 정리되어 있네요. 참고하겠습니다.', NOW(), NOW(), 2, 1),
('정보가 유용해서 도움이 많이 됐습니다.', NOW(), NOW(), 3, 1),
('이 정보는 정말 중요한 포인트인 것 같아요.', NOW(), NOW(), 4, 1),
('정보 게시글에 추가할만한 내용이 있습니다.', NOW(), NOW(), 5, 1),
('더 자세한 정보가 궁금합니다.', NOW(), NOW(), 6, 1),
('정보가 체계적으로 정리되어 있어 좋네요.', NOW(), NOW(), 7, 1),
('관련 정보를 공유해주셔서 감사합니다.', NOW(), NOW(), 8, 1),
('정보 게시글을 보고 큰 도움을 받았습니다.', NOW(), NOW(), 9, 1),
('좋은 정보 잘 읽었습니다.', NOW(), NOW(), 10, 1),

-- 에러 (board_no 11~20)
('에러 상황에 대한 상세 설명 감사합니다.', NOW(), NOW(), 11, 1),
('에러 해결에 도움이 되는 댓글입니다.', NOW(), NOW(), 12, 1),
('에러 메시지를 보고 비슷한 문제가 있었네요.', NOW(), NOW(), 13, 1),
('에러 상황 재현해 보았습니다. 참고하세요.', NOW(), NOW(), 14, 1),
('해당 에러에 대한 해결책을 공유합니다.', NOW(), NOW(), 15, 1),
('에러 원인을 찾는데 큰 도움이 되었습니다.', NOW(), NOW(), 16, 1),
('에러 관련하여 추가 질문이 있습니다.', NOW(), NOW(), 17, 1),
('비슷한 에러 경험이 있어서 공감합니다.', NOW(), NOW(), 18, 1),
('에러 로그 분석해본 결과입니다.', NOW(), NOW(), 19, 1),
('에러 해결 과정 공유 감사합니다.', NOW(), NOW(), 20, 1),

-- 자유 (board_no 21~30)
('자유롭게 의견을 나누는 공간이네요.', NOW(), NOW(), 21, 1),
('자유 게시판에 이런 내용도 괜찮을까요?', NOW(), NOW(), 22, 1),
('자유롭게 이야기 나눠서 좋습니다.', NOW(), NOW(), 23, 1),
('자유 게시판 분위기가 편안해서 좋아요.', NOW(), NOW(), 24, 1),
('다양한 주제로 자유롭게 대화해봅시다.', NOW(), NOW(), 25, 1),
('자유롭게 의견 공유합니다.', NOW(), NOW(), 26, 1),
('자유 게시판에 올릴만한 내용입니다.', NOW(), NOW(), 27, 1),
('자유롭게 질문하고 답변하는 공간이 필요해요.', NOW(), NOW(), 28, 1),
('편하게 이야기 나눌 수 있어서 좋습니다.', NOW(), NOW(), 29, 1),
('자유 게시판에 좋은 글 감사합니다.', NOW(), NOW(), 30, 1),

-- 질문 (board_no 31~40)
('질문에 대한 답변을 기다립니다.', NOW(), NOW(), 31, 1),
('질문 내용이 명확해서 이해하기 쉬워요.', NOW(), NOW(), 32, 1),
('비슷한 질문을 한 적이 있는데 참고하세요.', NOW(), NOW(), 33, 1),
('질문에 대한 좋은 답변이 있길 바랍니다.', NOW(), NOW(), 34, 1),
('질문하신 부분에 대해 제가 아는 내용을 공유합니다.', NOW(), NOW(), 35, 1),
('질문에 대해 추가 설명이 필요해 보입니다.', NOW(), NOW(), 36, 1),
('질문 게시글에 대한 의견 남깁니다.', NOW(), NOW(), 37, 1),
('질문 내용 잘 봤습니다. 답변 부탁드려요.', NOW(), NOW(), 38, 1),
('질문 게시판에 활발한 소통이 필요합니다.', NOW(), NOW(), 39, 1),
('질문에 도움 되는 정보 공유합니다.', NOW(), NOW(), 40, 1),

-- 후기 (board_no 41~50)
('후기 내용이 상세해서 도움이 되었습니다.', NOW(), NOW(), 41, 1),
('후기 게시글 잘 읽었습니다.', NOW(), NOW(), 42, 1),
('후기에 공감합니다. 좋은 정보 감사합니다.', NOW(), NOW(), 43, 1),
('후기 작성해주셔서 감사합니다.', NOW(), NOW(), 44, 1),
('후기가 실제 경험을 잘 반영하고 있네요.', NOW(), NOW(), 45, 1),
('후기 내용 참고해서 많은 도움이 됐어요.', NOW(), NOW(), 46, 1),
('후기 글에 추가 의견 남깁니다.', NOW(), NOW(), 47, 1),
('후기 게시글에 좋은 팁들이 많네요.', NOW(), NOW(), 48, 1),
('후기 내용을 보고 다음에 참고하겠습니다.', NOW(), NOW(), 49, 1),
('후기 글 감사합니다. 많은 도움이 됐습니다.', NOW(), NOW(), 50, 1);
