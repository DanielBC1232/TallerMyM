use MYM_DB;
go

--Modulo INVENTARIO

--SP listar productos con filtro
CREATE OR ALTER PROCEDURE SP_FILTRO_PRODUCTOS
(
    @nombre VARCHAR(50),
    @marca VARCHAR(50),
    @categoria VARCHAR(50),
    @stock INT,
    @precioMin DECIMAL(18,2),
	@precioMax DECIMAL(18,2)
)
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);

    SET @SQL = 'SELECT TOP 25 * FROM PRODUCTO_SERVICIO WHERE 1=1';

    -- Condiciones para cada parametro
    IF (@nombre IS NOT NULL AND @nombre <> '')
        SET @SQL = @SQL + ' AND (nombre LIKE ''%' + @nombre + '%'' OR DIFFERENCE(nombre, ''' + @nombre + ''') >= 3)';--tolerancia a mayus, minus y errores de escritura.

    IF (@marca IS NOT NULL AND @marca <> '')
        SET @SQL = @SQL + ' AND marca = @marca';

    IF (@categoria IS NOT NULL AND @categoria <> '')
        SET @SQL = @SQL + ' AND categoria = @categoria';

    IF (@stock IS NOT NULL AND @stock > 0)
        SET @SQL = @SQL + ' AND stock <= @stock';

    IF (@precioMin IS NOT NULL AND @precioMax IS NOT NULL)
        SET @SQL = @SQL + ' AND precio BETWEEN @precioMin AND @precioMax';

    -- Ejecutar la consulta dinamica con los parametros correctamente pasados
    EXEC sp_executesql 
        @SQL, 
        N'@nombre VARCHAR(50), @marca VARCHAR(50), @categoria VARCHAR(50), @stock INT, @precioMin DECIMAL(18,2), @precioMax DECIMAL(18,2)',
        @nombre = @nombre,
        @marca = @marca,
        @categoria = @categoria,
        @stock = @stock,
        @precioMin = @precioMin,
        @precioMax = @precioMax;
END;
GO

-- SP para generar el codigo de orden
CREATE OR ALTER PROCEDURE GenerarCodigoOrden
    @CodigoOrden VARCHAR(9) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    SET @CodigoOrden = UPPER(REPLACE(CONVERT(VARCHAR(36), NEWID()), '-', ''))
    SET @CodigoOrden = LEFT(@CodigoOrden, 9)
END;
GO

-- SP para insertar la orden
CREATE OR ALTER PROCEDURE SP_INSERTAR_ORDEN
    @tiempoEstimado DATETIME,
	@idVehiculo INT,
    @idTrabajador INT,
    @idCliente INT
AS
BEGIN
    DECLARE @codigoOrden VARCHAR(9)
    
    -- Genera el código único
    EXEC GenerarCodigoOrden @CodigoOrden = @codigoOrden OUTPUT

    -- Inserta la orden con el código generado
    INSERT INTO ORDEN (codigoOrden,tiempoEstimado, idVehiculo, idTrabajador, idCliente)
    VALUES (@codigoOrden,@tiempoEstimado, @idVehiculo, @idTrabajador, @idCliente)
    
END;
GO

select * from ORDEN;