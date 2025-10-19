import mongoose, { Document, Schema } from 'mongoose';

export interface IDepartment extends Document {
  _id: mongoose.Types.ObjectId;
  id: string; // ID único del departamento
  nombre: string; // Nombre del departamento
  descripcion?: string; // Descripción del departamento
  responsable_id?: string; // ID del responsable
  organization_id: string; // ID de la organización (multi-tenant)
  objetivos?: string; // Objetivos del departamento
  presupuesto?: number; // Presupuesto anual
  cantidad_empleados?: number; // Cantidad de empleados
  estado: string; // Estado: 'activo' | 'inactivo'
  created_at: Date;
  updated_at: Date;
}

const DepartmentSchema = new Schema<IDepartment>({
  id: {
    type: String,
    required: [true, 'El ID del departamento es obligatorio'],
    unique: true,
    trim: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre del departamento es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  descripcion: {
    type: String,
    trim: true,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  responsable_id: {
    type: String,
    trim: true
  },
  organization_id: {
    type: String,
    required: [true, 'El ID de la organización es obligatorio'],
    index: true
  },
  objetivos: {
    type: String,
    trim: true,
    maxlength: [1000, 'Los objetivos no pueden exceder 1000 caracteres']
  },
  presupuesto: {
    type: Number,
    min: [0, 'El presupuesto no puede ser negativo']
  },
  cantidad_empleados: {
    type: Number,
    default: 0,
    min: [0, 'La cantidad de empleados no puede ser negativa']
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo'],
    default: 'activo'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'departments'
});

// Índices para optimizar consultas
DepartmentSchema.index({ organization_id: 1, id: 1 }, { unique: true });
DepartmentSchema.index({ organization_id: 1, estado: 1 });
DepartmentSchema.index({ responsable_id: 1 });

// Middleware para actualizar updated_at
DepartmentSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// Métodos de instancia
DepartmentSchema.methods.getFullInfo = function() {
  return {
    id: this.id,
    nombre: this.nombre,
    descripcion: this.descripcion,
    responsable_id: this.responsable_id,
    organization_id: this.organization_id,
    objetivos: this.objetivos,
    presupuesto: this.presupuesto,
    cantidad_empleados: this.cantidad_empleados,
    estado: this.estado,
    created_at: this.created_at,
    updated_at: this.updated_at
  };
};

export const Department = mongoose.model<IDepartment>('Department', DepartmentSchema);