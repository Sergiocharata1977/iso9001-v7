import mongoose, { Schema, Document } from 'mongoose';

export enum ProcessStatus {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  COMPLETADO = 'completado',
  CANCELADO = 'cancelado',
}

export interface IProcessRecord extends Document {
  proceso: mongoose.Types.ObjectId;
  titulo: string;
  descripcion?: string;
  estado: ProcessStatus;
  responsable: mongoose.Types.ObjectId;
  fechaInicio?: Date;
  fechaFin?: Date;
  prioridad: 'baja' | 'media' | 'alta';
  fechaCreacion: Date;
}

const ProcessRecordSchema = new Schema<IProcessRecord>(
  {
    proceso: {
      type: Schema.Types.ObjectId,
      ref: 'ProcessDefinition',
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    descripcion: String,
    estado: {
      type: String,
      enum: Object.values(ProcessStatus),
      default: ProcessStatus.PENDIENTE,
    },
    responsable: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fechaInicio: Date,
    fechaFin: Date,
    prioridad: {
      type: String,
      enum: ['baja', 'media', 'alta'],
      default: 'media',
    },
  },
  { timestamps: { createdAt: 'fechaCreacion' } }
);

// Índices para optimizar consultas
ProcessRecordSchema.index({ proceso: 1 });
ProcessRecordSchema.index({ estado: 1 });
ProcessRecordSchema.index({ responsable: 1 });
ProcessRecordSchema.index({ prioridad: 1 });

export default mongoose.models.ProcessRecord ||
  mongoose.model<IProcessRecord>('ProcessRecord', ProcessRecordSchema);