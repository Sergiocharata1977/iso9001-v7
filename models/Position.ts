import mongoose, { Document, Schema } from 'mongoose';

export interface IPosition extends Document {
  _id: mongoose.Types.ObjectId;
  id: string; // ID único del puesto
  nombre: string; // Nombre del puesto
  descripcion_responsabilidades?: string; // Descripción de responsabilidades
  requisitos_experiencia?: string; // Requisitos de experiencia
  requisitos_formacion?: string; // Requisitos de formación
  departamento_id?: string; // ID del departamento
  reporta_a_id?: string; // ID del puesto al que reporta
  organization_id: string; // ID de la organización (multi-tenant)
  nivel_jerarquico?: string; // Nivel jerárquico
  salario_rango?: string; // Rango salarial
  cantidad_empleados?: number; // Cantidad de empleados en este puesto
  estado: string; // Estado: 'activo' | 'inactivo'
  created_at: Date;
  updated_at: Date;
}

const PositionSchema = new Schema<IPosition>({
  id: {
    type: String,
    required: [true, 'El ID del puesto es obligatorio'],
    unique: true,
    trim: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre del puesto es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  descripcion_responsabilidades: {
    type: String,
    trim: true,
    maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
  },
  requisitos_experiencia: {
    type: String,
    trim: true,
    maxlength: [500, 'Los requisitos de experiencia no pueden exceder 500 caracteres']
  },
  requisitos_formacion: {
    type: String,
    trim: true,
    maxlength: [500, 'Los requisitos de formación no pueden exceder 500 caracteres']
  },
  departamento_id: {
    type: String,
    trim: true
  },
  reporta_a_id: {
    type: String,
    trim: true
  },
  organization_id: {
    type: String,
    required: [true, 'El ID de la organización es obligatorio'],
    index: true
  },
  nivel_jerarquico: {
    type: String,
    enum: ['Ejecutivo', 'Gerencial', 'Coordinación', 'Supervisión', 'Analista', 'Técnico', 'Operativo'],
    trim: true
  },
  salario_rango: {
    type: String,
    trim: true,
    maxlength: [50, 'El rango salarial no puede exceder 50 caracteres']
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
  collection: 'positions'
});

// Índices para optimizar consultas
PositionSchema.index({ organization_id: 1, id: 1 }, { unique: true });
PositionSchema.index({ organization_id: 1, estado: 1 });
PositionSchema.index({ departamento_id: 1 });
PositionSchema.index({ reporta_a_id: 1 });
PositionSchema.index({ nivel_jerarquico: 1 });

// Middleware para actualizar updated_at
PositionSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// Métodos de instancia
PositionSchema.methods.getFullInfo = function() {
  return {
    id: this.id,
    nombre: this.nombre,
    descripcion_responsabilidades: this.descripcion_responsabilidades,
    requisitos_experiencia: this.requisitos_experiencia,
    requisitos_formacion: this.requisitos_formacion,
    departamento_id: this.departamento_id,
    reporta_a_id: this.reporta_a_id,
    organization_id: this.organization_id,
    nivel_jerarquico: this.nivel_jerarquico,
    salario_rango: this.salario_rango,
    cantidad_empleados: this.cantidad_empleados,
    estado: this.estado,
    created_at: this.created_at,
    updated_at: this.updated_at
  };
};

PositionSchema.methods.getDepartmentName = async function() {
  if (!this.departamento_id) return null;
  const Department = mongoose.model('Department');
  const dept = await Department.findOne({ id: this.departamento_id, organization_id: this.organization_id });
  return dept ? dept.nombre : null;
};

PositionSchema.methods.getReportsToName = async function() {
  if (!this.reporta_a_id) return null;
  const Position = mongoose.model('Position');
  const pos = await Position.findOne({ id: this.reporta_a_id, organization_id: this.organization_id });
  return pos ? pos.nombre : null;
};

export const Position = mongoose.model<IPosition>('Position', PositionSchema);