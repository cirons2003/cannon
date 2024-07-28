"""removed scheduled_time from order; added orders list to user model

Revision ID: 430f4d0004f1
Revises: 266d7d38b89f
Create Date: 2024-07-19 20:22:05.099120

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '430f4d0004f1'
down_revision = '266d7d38b89f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.add_column(sa.Column('meal_name', sa.String(length=50), nullable=True))
        batch_op.add_column(sa.Column('status', sa.String(length=10), nullable=True))
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['user_id'])
        batch_op.drop_column('scheduled_time')

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('placed_orders')
        batch_op.drop_column('last_k_meals')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('last_k_meals', mysql.JSON(), nullable=True))
        batch_op.add_column(sa.Column('placed_orders', mysql.JSON(), nullable=True))

    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.add_column(sa.Column('scheduled_time', mysql.VARCHAR(length=128), nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('user_id')
        batch_op.drop_column('status')
        batch_op.drop_column('meal_name')

    # ### end Alembic commands ###