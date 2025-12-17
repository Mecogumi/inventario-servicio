import { Injectable } from '@angular/core';

export interface InventoryItem {
  id?: number;
  name: string;
  image_path?: string;
  cantidad_necesaria: number;
  cantidad_disponible: number;
  created_at?: string;
}

declare global {
  interface Window {
    __TAURI_INTERNALS__: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private async invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
    // Importación dinámica para evitar problemas con el bundler
    const { invoke } = await import('@tauri-apps/api/core');
    return await invoke<T>(cmd, args);
  }

  async getAllItems(): Promise<InventoryItem[]> {
    return await this.invoke<InventoryItem[]>('get_all_items');
  }

  async addItem(name: string, cantidadNecesaria: number, cantidadDisponible: number, imageBase64?: string): Promise<InventoryItem> {
    return await this.invoke<InventoryItem>('add_item', {
      name,
      imageBase64,
      cantidadNecesaria,
      cantidadDisponible
    });
  }

  async updateItem(id: number, name: string, cantidadNecesaria: number, cantidadDisponible: number, imageBase64?: string): Promise<InventoryItem> {
    return await this.invoke<InventoryItem>('update_item', {
      id,
      name,
      imageBase64,
      cantidadNecesaria,
      cantidadDisponible
    });
  }

  async deleteItem(id: number): Promise<void> {
    await this.invoke<void>('delete_item', { id });
  }

  async exportToCsv(): Promise<string> {
    return await this.invoke<string>('export_to_csv');
  }
}
