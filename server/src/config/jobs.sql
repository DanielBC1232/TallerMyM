USE msdb;

--JOB para cambiar estado atrasado
DECLARE @jobId UNIQUEIDENTIFIER;
-- Crear el Job
EXEC sp_add_job 
    @job_name = N'ActualizarOrdenesAtrasadas', 
    @enabled = 1, -- Habilitado
    @notify_level_eventlog = 0, 
    @notify_level_email = 0, 
    @notify_level_netsend = 0, 
    @notify_level_page = 0, 
    @delete_level = 0, 
    @category_name = N'[Uncategorized (Local)]', 
    @owner_login_name = N'sa', 
    @job_id = @jobId OUTPUT;

-- Agregar un Step al Job
EXEC sp_add_jobstep 
    @job_id = @jobId, 
    @step_name = N'Ejecutar SP ActualizarOrdenesAtrasadas', 
    @step_id = 1, 
    @cmdexec_success_code = 0, 
    @on_success_action = 1, 
    @on_fail_action = 2, 
    @retry_attempts = 0, 
    @retry_interval = 0, 
    @os_run_priority = 0, 
    @subsystem = N'TSQL', 
    @command = N'EXEC ACTUALIZAR_ORDENES_ATRASADAS;', 
    @database_name = N'MYM_DB',
    @flags = 0;

-- Agregar un Schedule (Ejecutar cada 10 minutos)
EXEC sp_add_jobschedule 
    @job_id = @jobId, 
    @name = N'Cada 5 minutos', 
    @enabled = 1, 
    @freq_type = 4, -- Diario
    @freq_interval = 1, 
    @freq_subday_type = 4, -- Minutos
    @freq_subday_interval = 5, -- Cada 10 minutos
    @active_start_date = 20250318, -- Fecha de inicio
    @active_start_time = 000000; -- Hora de inicio

-- Asignar el Job al Agente de SQL Server
EXEC sp_add_jobserver 
    @job_id = @jobId, 
    @server_name = N'(local)';

PRINT 'Job ActualizarOrdenesAtrasadas creado correctamente';
GO

--JOB notificaciones de pagos atrasados
DECLARE @jobId UNIQUEIDENTIFIER;
-- Crear el Job
EXEC sp_add_job 
    @job_name = N'NotificarPagosAtrasados', 
    @enabled = 1, -- Habilitado
    @notify_level_eventlog = 0, 
    @notify_level_email = 0, 
    @notify_level_netsend = 0, 
    @notify_level_page = 0, 
    @delete_level = 0, 
    @category_name = N'[Uncategorized (Local)]', 
    @owner_login_name = N'sa', 
    @job_id = @jobId OUTPUT;

-- Agregar un Step al Job
EXEC sp_add_jobstep 
    @job_id = @jobId, 
    @step_name = N'Ejecutar SP NotificarPagosAtrasados', 
    @step_id = 1, 
    @cmdexec_success_code = 0, 
    @on_success_action = 1, 
    @on_fail_action = 2, 
    @retry_attempts = 0, 
    @retry_interval = 0, 
    @os_run_priority = 0, 
    @subsystem = N'TSQL', 
    @command = N'EXEC SP_NOTIFICACION_PAGO_ATRASADO;', 
    @database_name = N'MYM_DB',
    @flags = 0;

-- Agregar un Schedule (Ejecutar cada 5 minutos)
EXEC sp_add_jobschedule 
    @job_id = @jobId, 
    @name = N'Cada 5 minutos', 
    @enabled = 1, 
    @freq_type = 4, -- Diario
    @freq_interval = 1, 
    @freq_subday_type = 4, -- Minutos
    @freq_subday_interval = 5, -- Cada 5 minutos
    @active_start_date = 20250318, -- Fecha de inicio
    @active_start_time = 000000; -- Hora de inicio

-- Asignar el Job al Agente de SQL Server
EXEC sp_add_jobserver 
    @job_id = @jobId, 
    @server_name = N'(local)';

PRINT 'Job NotificarPagosAtrasados creado correctamente';
GO


--JOB para actualizar el estado activo de los clientes
DECLARE @jobId UNIQUEIDENTIFIER;

-- Crear el Job
EXEC sp_add_job 
    @job_name = N'ActualizarEstadoClienteInactivo', 
    @enabled = 1, 
    @notify_level_eventlog = 0, 
    @notify_level_email = 0, 
    @notify_level_netsend = 0, 
    @notify_level_page = 0, 
    @delete_level = 0, 
    @category_name = N'[Uncategorized (Local)]', 
    @owner_login_name = N'sa', 
    @job_id = @jobId OUTPUT;

-- Agregar un Step al Job
EXEC sp_add_jobstep 
    @job_id = @jobId, 
    @step_name = N'Ejecutar SP ActualizarEstadoCliente', 
    @step_id = 1, 
    @cmdexec_success_code = 0, 
    @on_success_action = 1, 
    @on_fail_action = 2, 
    @retry_attempts = 0, 
    @retry_interval = 0, 
    @os_run_priority = 0, 
    @subsystem = N'TSQL', 
    @command = N'EXEC SP_UPDATE_ESTADO_CLIENTE;', 
    @database_name = N'MYM_DB',
    @flags = 0;

-- Agregar un Schedule (Ejecutar cada hora)
EXEC sp_add_jobschedule 
    @job_id = @jobId, 
    @name = N'Cada hora', 
    @enabled = 1, 
    @freq_type = 4, -- Diario
    @freq_interval = 1, 
    @freq_subday_type = 8, -- Cada hora
    @freq_subday_interval = 1, -- Cada 1 hora
    @active_start_date = 20250406, -- Fecha actual (YYYYMMDD)
    @active_start_time = 000000; -- Hora de inicio (00:00:00)

-- Asignar el Job al Agente de SQL Server
EXEC sp_add_jobserver 
    @job_id = @jobId, 
    @server_name = N'(local)';

PRINT 'Job ActualizarEstadoClienteInactivo creado correctamente';
GO

--JOB que bloque usuarios si no hacen login por mas de 6 meses
DECLARE @jobId UNIQUEIDENTIFIER;

-- Crear el Job
EXEC sp_add_job 
    @job_name = N'BloquearUsuariosInactivos', 
    @enabled = 1, -- Habilitado
    @notify_level_eventlog = 0, 
    @notify_level_email = 0, 
    @notify_level_netsend = 0, 
    @notify_level_page = 0, 
    @delete_level = 0, 
    @category_name = N'[Uncategorized (Local)]', 
    @owner_login_name = N'sa', 
    @job_id = @jobId OUTPUT;

-- Agregar un Step al Job
EXEC sp_add_jobstep 
    @job_id = @jobId, 
    @step_name = N'Ejecutar SP_BLOQUEO_INACTIVIDAD', 
    @step_id = 1, 
    @cmdexec_success_code = 0, 
    @on_success_action = 1, 
    @on_fail_action = 2, 
    @retry_attempts = 0, 
    @retry_interval = 0, 
    @os_run_priority = 0, 
    @subsystem = N'TSQL', 
    @command = N'EXEC SP_BLOQUEO_INACTIVIDAD;', 
    @database_name = N'MYM_DB', 
    @flags = 0;

-- Agregar un Schedule (Ejecutar cada d�a)
EXEC sp_add_jobschedule 
    @job_id = @jobId, 
    @name = N'Ejecutar cada d�a', 
    @enabled = 1, 
    @freq_type = 4, -- Diario
    @freq_interval = 1, 
    @freq_subday_type = 8, -- Cada hora
    @freq_subday_interval = 24, -- Cada 1 d�a
    @active_start_date = 20250406, -- Fecha de inicio (YYYYMMDD)
    @active_start_time = 000000; -- Hora de inicio (00:00:00)

-- Asignar el Job al Agente de SQL Server
EXEC sp_add_jobserver 
    @job_id = @jobId, 
    @server_name = N'(local)';

PRINT 'Job BloquearUsuariosInactivos creado correctamente';
GO
