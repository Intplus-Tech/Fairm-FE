export interface BulkTransferResponse {
  _id: string;
  destination: string;
  transferDetails: {
    vehicle: string;
    driverName: string;
    departureTime: Date;
    estimatedArrival: Date;
    contactPerson: string;
    phoneNumber: string;
  };
  eggTransferGrade: {
    unsorted: number;
    medium: number;
    standard: number;
    pullet: number;
  };
  loadingDetails: {
    loadingStart: Date;
    loadingEnd: Date;
    loadingTeam: string;
    supervisor: string;
  };
  qualityControlLoading: {
    crackedCrates: number;
    crackedPieces: number;
    brokenEggs: number;
    dirtyRemoved: number;
  };
  packagingTransport: {
    cratesUsed: number;
    sacksUsed: number;
    palletized: boolean;
    strapped: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BulkTransferRequest {
  destination: string;
  transferDetails: {
    vehicle: string;
    driverName: string;
    departureTime: Date;
    estimatedArrival: Date;
    contactPerson: string;
    phoneNumber: string;
  };
  eggTransferGrade: {
    unsorted: number;
    medium: number;
    standard: number;
    pullet: number;
  };
  loadingDetails: {
    loadingStart: Date;
    loadingEnd: Date;
    loadingTeam: string;
    supervisor: string;
  };
  qualityControlLoading: {
    crackedCrates: number;
    crackedPieces: number;
    brokenEggs: number;
    dirtyRemoved: number;
  };
  packagingTransport: {
    cratesUsed: number;
    sacksUsed: number;
    palletized: boolean;
    strapped: boolean;
  };
}
