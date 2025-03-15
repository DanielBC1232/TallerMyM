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

--SP listar trabajadores con filtro
CREATE OR ALTER PROCEDURE SP_FILTRO_TRABAJADORES
(
    @nombreCompleto VARCHAR(200),
    @cedula VARCHAR(10),
    @salarioMin DECIMAL(10,2),
    @salarioMax DECIMAL(10,2)
)
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);

    SET @SQL = 'SELECT TOP 25 * FROM TRABAJADOR WHERE 1=1';

    -- Condiciones para cada parámetro
    IF (@nombreCompleto IS NOT NULL AND @nombreCompleto <> '')
        SET @SQL = @SQL + ' AND (nombreCompleto LIKE ''%' + @nombreCompleto + '%'' OR DIFFERENCE(nombreCompleto, ''' + @nombreCompleto + ''') >= 3)';

    IF (@cedula IS NOT NULL AND @cedula <> '')
        SET @SQL = @SQL + ' AND cedula = @cedula';

    IF (@salarioMin IS NOT NULL AND @salarioMax IS NOT NULL)
        SET @SQL = @SQL + ' AND salario BETWEEN @salarioMin AND @salarioMax';

    -- Ejecutar la consulta dinámica con los parámetros correctamente pasados
    EXEC sp_executesql 
        @SQL, 
        N'@nombreCompleto VARCHAR(200), @cedula VARCHAR(10), @salarioMin DECIMAL(10,2), @salarioMax DECIMAL(10,2), @seguroSocial VARCHAR(50)',
        @nombreCompleto = @nombreCompleto,
        @cedula = @cedula,
        @salarioMin = @salarioMin,
        @salarioMax = @salarioMax
END;
GO




