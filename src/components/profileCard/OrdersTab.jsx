import { motion } from "framer-motion";
import { Badge } from "../../components/ui/badge";

const orders = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMHByb2R1Y3R8ZW58MXx8fHwxNzYwNDQwNTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Classic Luxury Watch",
    price: "$299.00",
    status: "Delivered",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzYwNDQ2MDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Wireless Headphones",
    price: "$149.00",
    status: "In Transit",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1559563458-527698bf5295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGJhZ3xlbnwxfHx8fDE3NjA1MjYzMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Designer Leather Bag",
    price: "$399.00",
    status: "Processing",
  },
];

const statusColors = {
  Delivered: "bg-green-100 text-green-700 border-green-200",
  "In Transit": "bg-blue-100 text-blue-700 border-blue-200",
  Processing: "bg-orange-100 text-orange-700 border-orange-200",
};

export function OrdersTab() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          className="flex items-center gap-4 p-4 bg-white rounded-[18px] shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
            <img
              src={order.image}
              alt={order.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-foreground truncate">{order.title}</h4>
            <p className="text-muted-foreground">{order.price}</p>
          </div>

          <Badge
            className={`${
              statusColors[order.status]
            } rounded-lg px-3 py-1 border`}
          >
            {order.status}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
}
