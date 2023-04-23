-- AlterTable
ALTER TABLE "users" ADD COLUMN     "coins" INTEGER,
ADD COLUMN     "score" INTEGER;

-- CreateTable
CREATE TABLE "challenges" (
    "id" TEXT NOT NULL,
    "status" TEXT DEFAULT 'pending',
    "gameId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "opponentId" TEXT,
    "winnerId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
