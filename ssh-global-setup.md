# 🔑 Configuración SSH Global para Todos los Proyectos

## 📋 Crear Clave SSH Global

### En tu PC Local (Git Bash):
```bash
# Crear clave SSH global
ssh-keygen -t rsa -b 4096 -C "global-deploy-keys" -f ~/.ssh/global_deploy_key

# Ver la clave pública
cat ~/.ssh/global_deploy_key.pub

# Ver la clave privada
cat ~/.ssh/global_deploy_key
```

### En el Servidor VPS:
```bash
# Agregar la nueva clave global al authorized_keys
echo "ssh-rsa TU_CLAVE_PUBLICA_AQUI global-deploy-keys" >> ~/.ssh/authorized_keys

# Verificar permisos
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

### En GitHub (para cada repositorio):
1. **Settings → Secrets and variables → Actions**
2. **Agregar estos secrets**:
   - `VPS_HOST`: `31.97.162.229`
   - `VPS_USER`: `root`
   - `VPS_SSH_KEY`: (la clave privada global)

## 🎯 Ventajas de Usar Clave Global:
- ✅ Una sola clave para todos los proyectos
- ✅ Fácil mantenimiento
- ✅ No duplicar claves
- ✅ Seguridad centralizada

## 🔄 Usar en Múltiples Repositorios:
- 9001app-v6
- 9001app-v7
- Cualquier futuro proyecto

---

**Recomendación**: Usa la clave SSH que ya tienes funcionando para v6.
