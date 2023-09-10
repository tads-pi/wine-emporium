-- Inserting products
INSERT INTO
    products (
        uuid,
        active,
        name,
        slug,
        description,
        price,
        createdAt,
        updatedAt
    )
VALUES
    (
        UUID(),
        true,
        'Wine Bottle',
        'wine-bottle',
        'A bottle of red wine',
        19.99,
        now(),
        now()
    );

INSERT INTO
    products (
        uuid,
        active,
        name,
        slug,
        description,
        price,
        createdAt,
        updatedAt
    )
VALUES
    (
        UUID(),
        true,
        'Wine Glass',
        'wine-glass',
        'A stemmed glass for enjoying wine',
        9.99,
        now(),
        now()
    );

INSERT INTO
    products (
        uuid,
        active,
        name,
        slug,
        description,
        price,
        createdAt,
        updatedAt
    )
VALUES
    (
        UUID(),
        true,
        'Wine Opener',
        'wine-opener',
        'A tool for opening wine bottles',
        4.99,
        now(),
        now()
    );

-- Inserting product ratings
INSERT INTO
    product_ratings (
        uuid,
        active,
        product_id,
        value,
        createdAt,
        updatedAt
    )
VALUES
    (UUID(), true, 1, 4.5, now(), now());

INSERT INTO
    product_ratings (
        uuid,
        active,
        product_id,
        value,
        createdAt,
        updatedAt
    )
VALUES
    (UUID(), true, 1, 4.2, now(), now());

INSERT INTO
    product_ratings (
        uuid,
        active,
        product_id,
        value,
        createdAt,
        updatedAt
    )
VALUES
    (UUID(), true, 2, 4.8, now(), now());

INSERT INTO
    product_ratings (
        uuid,
        active,
        product_id,
        value,
        createdAt,
        updatedAt
    )
VALUES
    (UUID(), true, 3, 4.0, now(), now());