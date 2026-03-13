export type CustomerType = "manager";

export type PaymentMethod = "cash" | "bank_transfer";

export interface FarmGateSaleResponse {
  _id: string;
  customerType: CustomerType;
  customerName: string;
  contact: string;
  paymentMethod: PaymentMethod;
  eggSalesGrade: {
    pulletGradeA: {
      quantity: number;
      price: string;
      total: string;
      notes: string;
    };
    mediumGradeB: {
      quantity: number;
      price: string;
      total: string;
      notes: string;
    };
    smallGradeC: {
      quantity: number;
      price: string;
      total: string;
      notes: string;
    };
    crackedDiscount: {
      quantity: number;
      price: string;
      total: string;
      notes: string;
    };
  };
  packingDetails: {
    cratesUsed: number;
    sacksUsed: number;
    vehicle: string;
    loadedAt: Date;
    loadedBy: string;
    verifiedBy: string;
  };
  paymentStatus: {
    amountReceived: string;
    balanceDue: string;
    receipt: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FarmGateSaleRequest {
  customerType: CustomerType;
  customerName: string;
  contact: string;
  paymentMethod: PaymentMethod;
  eggSalesGrade: {
    pulletGradeA: {
      quantity: number;
      price: string;
      total: string;
      notes: string;
    };
    mediumGradeB: {
      quantity: number;
      price: string;
      total: string;
      notes: string;
    };
    smallGradeC: {
      quantity: number;
      price: string;
      total: string;
      notes: string;
    };
    crackedDiscount: {
      quantity: number;
      price: string;
      total: string;
      notes: string;
    };
  };
  packingDetails: {
    cratesUsed: number;
    sacksUsed: number;
    vehicle: string;
    loadedAt: Date;
    loadedBy: string;
    verifiedBy: string;
  };
  paymentStatus: {
    amountReceived: string;
    balanceDue: string;
    receipt: boolean;
  };
}
