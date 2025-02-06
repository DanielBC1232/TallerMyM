use MYM_DB;

CREATE OR ALTER PROCEDURE SP_FILTROS_PRODUCTOS(
    @NOMBRE VARCHAR(100),
    @MARCA VARCHAR(50),
    @CATEGORIA VARCHAR(50),
    @STOCK INT,
    @VEHICULOS_COMPATIBLES NVARCHAR(2048),
    @RANGO_PRECIO NVARCHAR(50)
)
AS
BEGIN

    --variable del sql dinamico
    DECLARE @SQL NVARCHAR(MAX)
    DECLARE @ParamDefinition NVARCHAR(MAX)
    DECLARE @PrecioMin DECIMAL(10,2)
    DECLARE @PrecioMax DECIMAL(10,2)

    SET @ParamDefinition = ''

    SET @SQL = 'SELECT * FROM PRODUCTO_SERVICIO WHERE 1=1'

    -- Filtro por NOMBRE
    IF @NOMBRE IS NOT NULL
    BEGIN
        SET @SQL = @SQL + ' AND nombre LIKE @nombreParam + ''%'''
        SET @ParamDefinition = @ParamDefinition + '@nombreParam VARCHAR(100),'
    END

    -- Filtro por MARCA
    IF @MARCA IS NOT NULL
    BEGIN
        SET @SQL = @SQL + ' AND marca = @marcaParam'
        SET @ParamDefinition = @ParamDefinition + '@marcaParam VARCHAR(50),'
    END

    -- Filtro por CATEGORIA
    IF @CATEGORIA IS NOT NULL
    BEGIN
        SET @SQL = @SQL + ' AND categoria = @categoriaParam'
        SET @ParamDefinition = @ParamDefinition + '@categoriaParam VARCHAR(50),'
    END

    -- Filtro por STOCK
    IF @STOCK IS NOT NULL
    BEGIN
        SET @SQL = @SQL + ' AND stock <= @stockParam'
        SET @ParamDefinition = @ParamDefinition + '@stockParam INT,'
    END

    -- Filtro por RANGO_PRECIO
    IF @RANGO_PRECIO IS NOT NULL
    BEGIN
        SELECT
            @PrecioMin = TRY_CONVERT(DECIMAL(10,2), JSON_VALUE(@RANGO_PRECIO, '$[0]')),
            @PrecioMax = TRY_CONVERT(DECIMAL(10,2), JSON_VALUE(@RANGO_PRECIO, '$[1]'))

        FROM STRING_SPLIT(@RANGO_PRECIO, ',')

        IF @PrecioMin IS NOT NULL AND @PrecioMax IS NOT NULL
        BEGIN
            SET @SQL = @SQL + ' AND precio BETWEEN @PrecioMinParam AND @PrecioMaxParam'
            SET @ParamDefinition = @ParamDefinition + '@PrecioMinParam DECIMAL(10,2), @PrecioMaxParam DECIMAL(10,2),'
        END
    END

    -- Filtro por VEHICULOS_COMPATIBLES (JSON Array):
    IF @VEHICULOS_COMPATIBLES IS NOT NULL
    BEGIN
        SET @SQL = @SQL + ' AND EXISTS (
            SELECT 1
            FROM OPENJSON(@VehiculosParam) WITH (vehiculo NVARCHAR(50) ''$'') AS vehiculos_frontend
            CROSS APPLY OPENJSON(PRODUCTO_SERVICIO.VEHICULOS_COMPATIBLES) WITH (producto_vehiculo NVARCHAR(50) ''$'') AS vehiculos_producto -- Referencing the table directly inside dynamic SQL is problematic, use alias if possible or ensure context.
            WHERE TRIM(vehiculos_frontend.vehiculo) = TRIM(vehiculos_producto.producto_vehiculo)
        )'
        SET @ParamDefinition = @ParamDefinition + '@VehiculosParam NVARCHAR(2048),'
    END

    SET @SQL = @SQL + ' ORDER BY nombre DESC'

    -- Eliminar la coma final
    IF LEN(@ParamDefinition) > 0
        SET @ParamDefinition = LEFT(@ParamDefinition, LEN(@ParamDefinition) - 1)

    --ejecutar el sql
    EXEC sys.[sp_executesql] @SQL,
                              @ParamDefinition,
                              @nombreParam = @NOMBRE,
                              @marcaParam = @MARCA,
                              @categoriaParam = @CATEGORIA,
                              @stockParam = @STOCK,
                              @VehiculosParam = @VEHICULOS_COMPATIBLES,
                              @PrecioMinParam = @PrecioMin,
                              @PrecioMaxParam = @PrecioMax
END