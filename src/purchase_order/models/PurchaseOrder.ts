export interface PurchaseOrder {
    purchaseOrder_id: number | null;
    date: string;
    total: number;
    product_id_fk:string;
    user_id_fk: number;
    street: string;
    city: string;
    cantidad:number;
    status_id_fk: number;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
}
