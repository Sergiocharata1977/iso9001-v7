import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployee extends Document {
  _id: mongoose.Types.ObjectId;
  id: string; // ID único del empleado
  organization_id: string; // ID de la organización (multi-tenant)
  nombres: string; // Nombres del empleado
  apellidos: string; // Apellidos del empleado
  email: string; // Email único
  telefono?: string; // Teléfono
  documento_identidad?: string; // Documento de identidad
  fecha_nacimiento?: Date; // Fecha de nacimiento
  nacionalidad?: string; // Nacionalidad
  direccion?: string; // Dirección
  telefono_emergencia?: string; // Teléfono de emergencia
  fecha_contratacion?: Date; // Fecha de contratación
  numero_legajo?: string; // Número de legajo
  puesto_id?: string; // ID del puesto
  departamento_id?: string; // ID del departamento
  supervisor_id?: string; // ID del supervisor
  estado: string; // Estado del empleado
  tipo_personal: string; // Tipo de personal
  // Campos específicos para ventas
  meta_mensual?: number; // Meta mensual
  comision_porcentaje?: number; // Porcentaje de comisión
  especialidad_ventas?: string; // Especialidad de ventas
  fecha_inicio_ventas?: Date; // Fecha de inicio en ventas
  zona_venta?: string; // Zona de venta asignada
  created_at: Date;
  updated_at: Date;
}

const EmployeeSchema = new Schema<IEmployee>({
  id: {
    type: String,
    required: [true, 'El ID del empleado es obligatorio'],
    unique: true,
    trim: true
  },
  organization_id: {
    type: String,
    required: [true, 'El ID de la organización es obligatorio'],
    index: true
  },
  nombres: {
    type: String,
    required: [true, 'Los nombres son obligatorios'],
    trim: true,
    maxlength: [50, 'Los nombres no pueden exceder 50 caracteres']
  },
  apellidos: {
    type: String,
    required: [true, 'Los apellidos son obligatorios'],
    trim: true,
    maxlength: [50, 'Los apellidos no pueden exceder 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  telefono: {
    type: String,
    trim: true,
    maxlength: [20, 'El teléfono no puede exceder 20 caracteres']
  },
  documento_identidad: {
    type: String,
    trim: true,
    maxlength: [20, 'El documento de identidad no puede exceder 20 caracteres']
  },
  fecha_nacimiento: {
    type: Date
  },
  nacionalidad: {
    type: String,
    trim: true,
    maxlength: [50, 'La nacionalidad no puede exceder 50 caracteres']
  },
  direccion: {
    type: String,
    trim: true,
    maxlength: [200, 'La dirección no puede exceder 200 caracteres']
  },
  telefono_emergencia: {
    type: String,
    trim: true,
    maxlength: [20, 'El teléfono de emergencia no puede exceder 20 caracteres']
  },
  fecha_contratacion: {
    type: Date
  },
  numero_legajo: {
    type: String,
    trim: true,
    maxlength: [20, 'El número de legajo no puede exceder 20 caracteres']
  },
  puesto_id: {
    type: String,
    trim: true
  },
  departamento_id: {
    type: String,
    trim: true
  },
  supervisor_id: {
    type: String,
    trim: true
  },
  estado: {
    type: String,
    enum: ['Activo', 'Inactivo', 'Licencia', 'Suspendido'],
    default: 'Activo'
  },
  tipo_personal: {
    type: String,
    enum: ['administrativo', 'ventas', 'técnico', 'supervisor', 'gerencial', 'operativo'],
    default: 'administrativo'
  },
  meta_mensual: {
    type: Number,
    min: [0, 'La meta mensual no puede ser negativa']
  },
  comision_porcentaje: {
    type: Number,
    min: [0, 'La comisión no puede ser negativa'],
    max: [100, 'La comisión no puede exceder 100%']
  },
  especialidad_ventas: {
    type: String,
    trim: true,
    maxlength: [100, 'La especialidad de ventas no puede exceder 100 caracteres']
  },
  fecha_inicio_ventas: {
    type: Date
  },
  zona_venta: {
    type: String,
    trim: true,
    maxlength: [50, 'La zona de venta no puede exceder 50 caracteres']
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
  collection: 'employees'
});

// Índices para optimizar consultas
EmployeeSchema.index({ organization_id: 1, id: 1 }, { unique: true });
EmployeeSchema.index({ organization_id: 1, email: 1 }, { unique: true });
EmployeeSchema.index({ organization_id: 1, estado: 1 });
EmployeeSchema.index({ organization_id: 1, tipo_personal: 1 });
EmployeeSchema.index({ puesto_id: 1 });
EmployeeSchema.index({ departamento_id: 1 });
EmployeeSchema.index({ supervisor_id: 1 });

// Middleware para actualizar updated_at
EmployeeSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// Métodos de instancia
EmployeeSchema.methods.getFullName = function() {
  return `${this.nombres} ${this.apellidos}`;
};

EmployeeSchema.methods.activate = function() {
  this.estado = 'Activo';
  return this.save();
};

EmployeeSchema.methods.deactivate = function() {
  this.estado = 'Inactivo';
  return this.save();
};

EmployeeSchema.methods.getPositionName = async function() {
  if (!this.puesto_id) return null;
  const Position = mongoose.model('Position');
  const pos = await Position.findOne({ id: this.puesto_id, organization_id: this.organization_id });
  return pos ? pos.nombre : null;
};

EmployeeSchema.methods.getDepartmentName = async function() {
  if (!this.departamento_id) return null;
  const Department = mongoose.model('Department');
  const dept = await Department.findOne({ id: this.departamento_id, organization_id: this.organization_id });
  return dept ? dept.nombre : null;
};

EmployeeSchema.methods.getSupervisorName = async function() {
  if (!this.supervisor_id) return null;
  const Employee = mongoose.model('Employee');
  const sup = await Employee.findOne({ id: this.supervisor_id, organization_id: this.organization_id });
  return sup ? sup.getFullName() : null;
};

export const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);