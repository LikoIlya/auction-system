-- -- User Data
INSERT INTO public."user"(
 	"email", "firstName", "lastName", "age", "createdBy", "updatedBy")
 VALUES ('ilyaliko64@gmail.com', 'Illia', 'Likhoshva',	20,	0, 0);

-- -- Auction Data


 INSERT INTO public."auction"(id, name, description, location, "updatedById", "createdById", "endTime")
 VALUES (1, 'Test Auction', 'I want to sell my things!', 'Sydney NSW', 1, 1, '2018-08-31 17:33:37.681312+00');



-- -- Bid Data

 INSERT INTO public."bid"(id, amount, "auctionId", "updatedById", "createdById")
 VALUES (1, 200,1, 1, 1);


