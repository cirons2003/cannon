"""added password reset column

Revision ID: 54c5b0cfe7e3
Revises: fbf46daae846
Create Date: 2024-08-19 10:34:48.162259

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '54c5b0cfe7e3'
down_revision = 'fbf46daae846'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_reset', sa.String(length=6), nullable=True))
        batch_op.create_unique_constraint(None, ['password_reset'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('password_reset')

    # ### end Alembic commands ###
