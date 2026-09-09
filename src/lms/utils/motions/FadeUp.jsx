import {motion} from "framer-motion"

export default function FadeUp({ children }) {
    return (
        <motion.div
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.5, delay }}
            initial={{ opacity: 0, y: 40 }} // Starts invisible and pushed up
        whileInView={{ opacity: 1, y: 0 }} // Moves to its natural spot when visible
        viewport={{ once: true, margin: "-100px" }} // Triggers once; padding ensures it doesn't clip
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], forwards:true }}
        >
            {children}
        </motion.div>
    );
}