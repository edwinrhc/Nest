select *
from orders
         inner join order_details on orders.order_id = order_details.order_id
         inner join products on order_details.product_id = products.product_id
         inner join customers on orders.customer_id = customers.customer_id
where orders.order_id = 10250;
