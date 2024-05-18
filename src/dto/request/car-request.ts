export interface CreateCarRequest extends Request {
  plate: string;
  manufacture: string;
  model: string;
  image: string;
  rentPerDay: number;
  capacity: number;
  description: string;
  transmission: string;
  year: number;
}

export interface UpdateCarRequest extends Request {
  plate?: string;
  manufacture?: string;
  model?: string;
  image?: string;
  rentPerDay?: number;
  capacity?: number;
  description?: string;
  transmission?: string;
  year?: number;
}
