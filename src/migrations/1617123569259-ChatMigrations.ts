import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class ChatMigrations1617123569259 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'message',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'message',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
    await queryRunner.addColumn(
      'message',
      new TableColumn({
        name: 'senderId',
        type: 'int',
      }),
    );
    await queryRunner.addColumn(
      'message',
      new TableColumn({
        name: 'receiverId',
        type: 'int',
      }),
    );
    await queryRunner.createForeignKey(
      'message',
      new TableForeignKey({
        columnNames: ['senderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'message',
      new TableForeignKey({
        columnNames: ['receiverId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'message',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('message');
    const foreignKeySender = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('senderId') !== -1,
    );
    const foreignKeyReceiver = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('receiverId') !== -1,
    );
    await queryRunner.dropForeignKey('message', foreignKeySender);
    await queryRunner.dropForeignKey('message', foreignKeyReceiver);
    await queryRunner.dropColumn('message', 'senderId');
    await queryRunner.dropColumn('message', 'receiverId');
    await queryRunner.dropTable('message');
    await queryRunner.dropTable('user');
  }
}
