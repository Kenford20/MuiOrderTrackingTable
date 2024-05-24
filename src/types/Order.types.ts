type OrderTypes =
  | "Standard"
  | "ReturnOrder"
  | "TransferOrder"
  | "SaleOrder"
  | "PurchaseOrder";

interface Order {
  createdByUserName: string;
  createdDate: string;
  customerName: string;
  orderId: string;
  orderType: OrderTypes;
}

export type { Order, OrderTypes };
