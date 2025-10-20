import mongoose, { Schema, Document } from 'mongoose';

export enum ProcessType {
  ESTRATEGICO = 'estrategico',
  OPERATIVO = 'operativo',
  SOPORTE = 'soporte',
}

export interface IProcessDefinition extends Document {
  codigo: string;
  nombre: string;
  descripcion: string;
  tipo: ProcessType;
  propietario: mongoose.Types.ObjectId;
  departamento?: mongoose.Types.ObjectId;
  activo: boolean;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

const ProcessDefinitionSchema = new Schema<IProcessDefinition>(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      match: /^PROC-[A-Z0-9-]+$/,
    },
    nombre: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
    },
    descripcion: {
      type: String,
      required: true,
      minlength: 10,
    },
    tipo: {
      type: String,
      enum: Object.values(ProcessType),
      required: true,
    },
    propietario: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    departamento: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' } }
);

// Índices para optimizar consultas
ProcessDefinitionSchema.index({ codigo: 1 }, { unique: true });
ProcessDefinitionSchema.index({ tipo: 1 });
ProcessDefinitionSchema.index({ propietario: 1 });
ProcessDefinitionSchema.index({ departamento: 1 });
ProcessDefinitionSchema.index({ activo: 1 });

export default mongoose.models.ProcessDefinition ||
  mongoose.model<IProcessDefinition>('ProcessDefinition', ProcessDefinitionSchema);