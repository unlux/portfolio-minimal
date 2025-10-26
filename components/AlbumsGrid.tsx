"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animation-presets";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlbumPasswordDialog } from "@/components/AlbumPasswordDialog";
import { AddAlbumDialog } from "@/components/AddAlbumDialog";
import { PhotoAlbum } from "@prisma/client";

export function AlbumsGrid({ albums }: { albums: PhotoAlbum[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 my-8 sm:grid-cols-2 lg:grid-cols-3"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {albums.map((album) => (
        <motion.div key={album.id} variants={fadeInUp}>
          <AlbumPasswordDialog album={album}>
            <Card className="transition-transform duration-200 h-full hover:scale-105">
              <CardHeader>
                <CardTitle className="font-semibold tracking-tighter">
                  {album.name}
                </CardTitle>
                <CardDescription>
                  {album.isProtected ? "Password Protected" : "Open"}
                </CardDescription>
              </CardHeader>
            </Card>
          </AlbumPasswordDialog>
        </motion.div>
      ))}
      <AddAlbumDialog />
    </motion.div>
  );
}
