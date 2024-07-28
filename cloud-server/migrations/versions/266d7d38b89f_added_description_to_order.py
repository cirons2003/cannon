"""added description to Order

Revision ID: 266d7d38b89f
Revises: 41307a717729
Create Date: 2024-07-04 19:58:54.349822

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '266d7d38b89f'
down_revision = '41307a717729'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.String(length=500), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.drop_column('description')

    # ### end Alembic commands ###